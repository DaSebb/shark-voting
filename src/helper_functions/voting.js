export function getUserId() {
    let id = localStorage.getItem('userId')
    if (!id) {
        id = crypto.randomUUID()
        localStorage.setItem('userId', id)
    }
    return id
}

export async function getVotes() {
    const res = await fetch('http://localhost:3000/votes')
    const data = await res.json()
    return data
}

export function vote(userId, req) {

}