function handler(req, res){

    const id = req.body.id

if (req.body === 'DELETE') {
    fetch('api/note', {
        method: 'POST',
        body: JSON.stringify({
            id: id
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

}
export default handler;