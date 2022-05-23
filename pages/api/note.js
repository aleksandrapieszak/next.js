function handler(req, res){

    const id = req.body.id

    if (req.method === 'POST'){
        const { title, description } = req.body

        if (!title || !description ||
            title.trim() === '' || description.trim() === '')
        {
            res.status(422).json({ message: 'Invalid input.'});
            return;

        }

        const created = new Date().toLocaleDateString()

        const newNote = {
            title,
            description,
            created
        }
        console.log(newNote)

        fetch('http://127.0.0.1:8000/api/notes',{
            method: 'POST',
            body: JSON.stringify(newNote),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok){
                return response.json();
            }
            return response.json().then((data)=> {
                throw new Error(data.message || 'Something went wrong')
            })
        })
            .then((data) => {
                console.log(data)
            })

    }


}
export default handler;