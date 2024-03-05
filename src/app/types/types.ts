type CommonProps = {
  id: string,
  title: string,
  image: boolean,
  created_at: string,
  description: string,
  who: string,
}

type News = CommonProps

type Competition = CommonProps

type Training = CommonProps & { aspect: string }

type Card = {
  title: string,
  description: string,
  image: string,
  path: string,
}

type Helper = {
  id: string,
  name: string,
  path: string,
  image: boolean,
  created_at: string,
  who: string,
}