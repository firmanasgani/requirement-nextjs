import React, { useState } from "react";

export default function FormSupplier() {

    const [formData, setFormData] = useState({
        name: "",
        alamat: '',
        email: ''
    })

    const [formSuccess, setFormSuccess] = useState(false) 
    const [formSuccessMessage, setFormSuccessMessage] = useState("")

    const handleInput = (e) => {
        const fieldName = e.target.name
        const fieldValue = e.target.value
        console.log(fieldValue)

        setFormData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }))
    }

    const submitForm = (e) => {
        e.preventDefault()
        const formURL = e.target.action
        const data = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value)
        })

        var array = {
            name: 'firman',
            alamat: 'Firman',
            email: 'email'
        }

        fetch('/api/supplier/new', {
            method: "POST",
            body: JSON.stringify(array),
            headers: {
                'accept' : 'application/json'
            }
        }).then((response) => response.json())
        .then((data) => {
            setFormData({
                name: "",
                alamat: "",
                email: ""
            })

            setFormSuccess(true)
            setFormSuccessMessage(data.submission_text)
        })
    }

    return (
        <>
            <div className="container">
                <div>
                    <h1>Form Supplier</h1>
                    {formSuccess ? <div>{formSuccessMessage}</div> : 
                        <form method="POST" action="/api/supplier/new" onSubmit={submitForm}>
                          
                            <div>
                                <label>Name</label> 
                                <input type="text" name="name" onChange={handleInput} value={formData.name} />
                            </div>
          
                            <div>
                                <label>Alamat</label>
                                <input type="text" name="alamat" onChange={handleInput} value={formData.alamat} />
                            </div>
          
                            <div>
                                <label>Email</label>
                         
                                <input type="text" name="email" onChange={handleInput} value={formData.email} />
                            
            
                            </div>
          
                            <button type="submit" className="button button-primary">Send message</button>
                        </form>
                    }
                </div>
            </div>
        </>
    )
}
