import { PageImage } from "@/components/PageImage"

const page = () => {
  return (
    <main className="flex-col w-full items-center justify-center text-center max-w-full overflow-x-hidden">
      <PageImage imageUrl={"/contact.jpg"} />
      <section className="flex flex-col gap-5 max-w-[800px] mx-auto p-10 min-h-[500px] text-justify">
        <h1 className="text-3xl text-center">Dane do kontaktu SPS &#x201E;ISKRA&#x201D;</h1>
        <p className="font-semibold">Facebook: <a className="text-blue-600" href="https://www.facebook.com/profile.php?id=61551801553096" target="_blank">https://www.facebook.com/profile.php?id=61551801553096</a></p>
        <p className="font-semibold">email: <span className="font-normal">sps.iskra@bydgoszcz.hub.pl</span> lub <span className="font-normal">biuro@spsiskra.pl</span></p>
        <p className="font-semibold">tel: <span className="font-normal">+48 781-697-800</span></p>
      </section>
    </main>
  )
}

export default page
