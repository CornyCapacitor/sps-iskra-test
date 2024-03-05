'use client'

import { spsIskraAuthAtom } from '@/state/atoms'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Link from 'next/link'
import { toAdminSuccessSwal } from '../utils/swals'

const SignupPage = () => {
  const [user] = useAtom(spsIskraAuthAtom)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [username, setUsername] = useState('')
  const [permissions, setPermissions] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignUp = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    let isValidEmail = false
    let isValidPassword = false
    let isValidUsername = false


    const checkErrors = () => {
      setErrors([])
      const addError = (error: string) => {
        setErrors(prev => [...prev, error])
      }

      if (!emailRegex.test(email)) {
        addError("Format adresu e-mail jest niepoprawny. Proszę spróbuj ponownie. np. przykład@gmail.com")
      } else {
        isValidEmail = true
      }

      if (password !== passwordRepeat) {
        addError("Hasła muszą być jednakowe.")
      } else if (password.length < 6) {
        addError("Hasło musi mieć co najmniej 6 znaków.")
      } else {
        isValidPassword = true
      }

      if (username.length < 3) {
        addError("Nazwa użytkownika musi mieć co najmniej 3 znaki.")
      } else {
        isValidUsername = true
      }
    }

    checkErrors();

    if (isValidEmail && isValidPassword && isValidUsername) {
      try {
        await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${location.origin}/admin/login`,
            data: {
              username: username,
              permissions: permissions,
            }
          }
        })
        setEmail('')
        setPassword('')
        toAdminSuccessSwal("Udało ci się pomyślnie założyć konto. Proszę sprawdź swoją skrzynkę e-mail, aby autoryzować swoje konto, w przeciwnym razie nie będziesz mógł zalogować się poprawnie.", () => { router.push('/admin') })
      } catch (error) {
        console.error(error)
      }
    }
  }

  if (user && user.user_metadata.permissions === "yes") {
    return (
      <main className="pt-[150px] min-h-screen flex items-center justify-center bg-gray-800 p-6 text-white">
        <div className="bg-gray-900 p-8 rounded-lg shadow-md w-96 flex flex-col items-center justify-center gap-5">
          <h1 className="text-3xl">Rejestracja</h1>
          {errors.length > 0 &&
            <ul className="text-red-600 text-sm">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          }
          <input type="email" name="email" value={email} placeholder="adres email" onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
          <input type="password" name="password" value={password} placeholder="hasło" onChange={(e) => setPassword(e.target.value)} className="w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
          <input type="password" name="password" value={passwordRepeat} placeholder="potwierdź hasło" onChange={(e) => setPasswordRepeat(e.target.value)} className="w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
          <input type="username" name="username" value={username} placeholder="imię i nazwisko" onChange={(e) => setUsername(e.target.value)} className="w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
          <input type="username" name="permissions" value={permissions} placeholder="dodatkowe uprawnienia?" onChange={(e) => setPermissions(e.target.value)} className="w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
          <button onClick={handleSignUp} className="w-full p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none">Stwórz konto</button>
          <Link href="/admin/login" className="w-full p-3 rounded-md bg-gray-700 text-white hover:bg-gray-600 focus:outline-none text-center">Powrót do logowania</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-[300px] min-h-screen flex items-start justify-center bg-gray-800 p-6 text-white text-center">
      <span className="text-2xl">Prawdopodobnie nie powinno cię tu być.</span>
    </main>
  )
}

export default SignupPage
