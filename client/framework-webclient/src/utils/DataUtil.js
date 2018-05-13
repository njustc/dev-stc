
getData = () => {
    return fetch('http://127.0.0.1:8000/entrust',
        {
            method: "GET"
        })
        .then((res) =>
        {
            if(res.ok)
            {
                return res.json();
            }
            else
            {
                return Promise.reject();
            }
        })
        .then(res=>
        {
            this.setState({name:res.entrustString})
            this.setState({ID:res.id})
            // debugger
        })

}

handleClick = () => {
    let obj = {
        entrustString: this.state.name,
        id: this.state.ID
    };

    fetch('http://127.0.0.1:8000/entrust',
        {
            method: 'PUT',
            headers: {},
            // body: formData,
            body: JSON.stringify(obj)


        })

        .then((response) =>
        {
            //debugger
            if (response.ok) {
                //return response.json();
            }
        })
        .then((json) =>
        {
            // alert(JSON.stringify(json));
        }).catch((error) =>
    {
        console.error(error);
    });
}

setData = () => {
    // let formData = new FormData();
    // formData.append("entrustString","Peppa pig");
    // formData.append("id","STC_00001");

    let obj = {
        entrustString: "Peppa Pig",
        id: "1"
    };

    // debugger

    fetch('http://127.0.0.1:8000/entrust',
        {
            method: 'PUT',
            headers: {},
            // body: formData,
            body: JSON.stringify(obj)


        })

        .then((response) =>
        {
            //debugger
            if (response.ok) {
                //return response.json();
            }
        })
        .then((json) =>
        {
            // alert(JSON.stringify(json));
        }).catch((error) =>
    {
        console.error(error);
    });

}
