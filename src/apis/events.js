//URL de la base de datos JSON
const baseURL = '';

export const fetchEvents = async()=> {
    return await fetch(`${baseURL}/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(event)
    })
}

export const mutateEvent = async (event, id) => {
    return await fetch(`${baseURL}/events/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body:  JSON.stringify(event)
    })
}

export const destoyEvent = async (id) => {
    return await fetch(`${baseURL}/events/${id}`, {
        method: 'DELETE'
    })
}