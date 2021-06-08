import React from 'react';

export class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.weightChange = this.weightChange.bind(this);
        this.heightChange = this.heightChange.bind(this);
    }

    weightChanged(weightValue) {
        this.setState({weight:weightValue});
    }
    heightChanged(heightValue) {
        this.setState({height:heightValue});
    }

    render() {
        return (
            <div className = "base-container">
                <div class = "header">
                    <h1>BMI Calculation</h1>
                </div>
                <div className = "form">
                    <div className = "form-group">
                        <label htmlFor="height">Enter Your Height: </label>
                        <input type = "number" required name = "height" placeholder = "Inches" min = "0" max = "99" onChange = {this.heightChange}/>
                    </div>
                    <div className = "form-group">
                        <label htmlFor="weight">Enter Your Weight: </label>
                        <input type = "number" required name = "weight" placeholder = "Pounds" min = "0" max="500" onChange = {this.weightChange}/>
                    </div>
                </div>
                <div className = "footer">
                    <input type="button" onClick = {this.bmi()} Value="Calculate"></input>
                </div>
                <div className = "row">
                    <h3> BMI = {this.state.bmi}</h3>
                </div>
                <div className = "row">
                    <h3>{this.state.bmiClass}</h3>
                </div>

            </div>
        )
    }
    bmi()
    {
        let bmiValue = (this.state.weight / this.state.height) / this.state.height;
        this.setState({bmi : bmiValue});
        let bmiClass = this.getBmi(bmiValue);
        this.setState({bmiCLass:bmiClass});
    }

    getBmi(bmi) {
        if(bmi < 18.5) {
            return "Underweight";
        }
        if(bmi >= 18.5 && bmi < 24.9) {
            return "Normal weight";
        }
        if(bmi >= 25 && bmi < 29.9) {
            return "Overweight";
        }
        if(bmi >= 30) {
            return "Obese";
        }
    }
}



export default Calculator;