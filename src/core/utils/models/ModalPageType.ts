export default interface ModalPageI {
    active: boolean
    setActive: (state: boolean) => void
    _padding?: string
}