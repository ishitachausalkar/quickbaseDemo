import React from 'react';
import FORM from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class Formpg extends React.Component {
    state = {
        selectedOptions: [],
        label: "",
        required: false,
        choices: [
            "Asia",
            "Australia",
            "Western Europe",
            "North America",
            "Eastern Europe",
            "Latin America",
            "Middle East and Africa"
        ],
        displayAlpha: true,
        default: ""
    };


    change = e => {
        if (e.target.name === "choices") {
            let selected = [...e.target.options]
                .filter(option => option.selected)
                .map(option => option.value)
            this.setState({
                selectedOptions: selected
            });
            console.log("this.selectedOptions", selected, e.target.options);
        } else if (e.target.name === "displayAlpha") {
            let selected = [...e.target.options]
                .filter(option => option.selected)
                .map(option => option.value)
            this.setState({
                [e.target.name]: (selected[0]) ? true : false
            });
        } else if (e.target.name === "required") {
            console.log("e.target.value", e.target.checked);
            this.setState({
                [e.target.name]: e.target.checked
            });
        } else {
            if (e.target.name === "default") {

            }
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    }

    reset() {
        if (this.state.default !== this.state.choices) {
            console.log("this.state.default :" + this.state.default);
            let newChoice = this.state.default;
            console.log("this.state.choices :" + this.state.choices);
            this.setState({
                selectedOptions: [],
                label: "",
                required: false,
                choices: [
                    newChoice,
                    "Asia",
                    "Australia",
                    "Western Europe",
                    "North America",
                    "Eastern Europe",
                    "Latin America",
                    "Middle East and Africa"
                ],
                displayAlpha: true,
                default: ""
            })
        }
    }

    async submitForm(e) {
        e.preventDefault();
        if (this.state.label.length > 0) {
            if (this.state.default !== "" && this.state.selectedOptions.indexOf(this.state.default) === -1) {
                await this.setState({
                    selectedOptions: this.state.selectedOptions.concat(this.state.default)
                })
            }
            this.setState({
                'choices': this.state.selectedOptions
            });
            //console.log(this.state.choices);  
            if (this.state.choices.length > 50) {
                alert("cannot select choices greater than 50");
            } else {
                console.log("Post Data:", this.state);
                await fetch('http://www.mocky.io/v2/566061f21200008e3aabd919', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.state)
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log("responseJson", responseJson);
                        this.reset();
                        return responseJson;
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        } else {
            alert("Please Enter all required values.");
        }
    }

    getOptions() {
        return this.state.choices.map(function (item) {
            return <option key={item} value={item}>{item}</option>;
        }.bind(this));
    }

    render() {
        return (
            <FORM>
                <label>Label* : </label>
                <input type="text" name="label" value={this.state.label} onChange={e => this.change(e)} />
                <br />
                <label>Type : </label> Multi Select
                <input type="checkbox" name="required" checked={this.state.required} onChange={e => this.change(e)} /> A Value is required
                <br />
                <label>Default value : </label>
                <input type="text" name="default" onChange={e => this.change(e)} />
                <br />
                <label>Choices :</label>
                <select
                    id="choices"
                    name="choices"
                    multiple
                    onChange={e => this.change(e)}
                >{this.getOptions()}</select>
                <br />
                <label>Order :</label>
                <select name="displayAlpha" value={this.state.displayAlpha} onChange={e => this.change(e)} >
                    <option value="true">In alphabaticle</option>
                    <option value="false">Non alphabaticle</option>
                </select>
                <br />
                <Button variant="primary" type="button" value="Save" onClick={e => this.submitForm(e)}>Save Changes</Button>&nbsp;Or&nbsp;
                <Button variant="light" type="reset" value="reset" onClick={e => this.reset()}>Cancel</Button>
            </FORM>
        );
    }
}