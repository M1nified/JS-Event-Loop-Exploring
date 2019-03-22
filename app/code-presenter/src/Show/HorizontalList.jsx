import React, { Component } from 'react';
import { timingSafeEqual } from 'crypto';

export default class HorizontalList extends Component {

    state = {
        title: null,
        elements: [],
        savedSteps: {}
    }

    constructor({ title }) {
        super()
        this.state.title = title;
    }

    render() {
        return (
            <div className="list">
                <div className="list-title">{this.state.title || ''}</div>
                <div className="list-elements">{this.state.elements.map((element, i) => (
                    <div className="list-element" key={i}>{element}</div>
                ))}</div>
            </div>
        )
    }

    push = (element) => {
        const elements = this.state.elements
        elements.push(element)
        this.setState({ elements })
    }

    pop = () => {
        const elements = this.state.elements
        elements.pop()
        this.setState({ elements })
    }

    unshift = (element) => {
        const elements = this.state.elements
        elements.unshift(element)
        this.setState({ elements })
    }

    shift = () => {
        const elements = this.state.elements
        elements.shift()
        this.setState({ elements })
    }

    loadStep = (stepNumber) => {
        if (stepNumber === -1)
            this.setState({ elements: [] })
        if (!this.state.savedSteps[stepNumber]) {
            return false;
        }
        this.setState({ elements: this.state.savedSteps[stepNumber] })
    }

    endStep = (stepNumber) => {
        const savedSteps = this.state.savedSteps
        savedSteps[stepNumber] = this.state.elements.slice()
        this.setState({ savedSteps })
    }

}