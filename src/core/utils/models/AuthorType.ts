export default interface AuthorType {
    username: string
    description: string | null
    // eslint-disable-next-line camelcase
    first_name: string | null
    followers: number
    following: number
    // eslint-disable-next-line camelcase
    job_title: string | null
    // eslint-disable-next-line camelcase
    last_name: string | null
    // eslint-disable-next-line camelcase
    profile_photo_url: string | null
    isAuth?: boolean
}