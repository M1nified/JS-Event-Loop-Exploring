import React, { Component } from 'react';
import './Show.css'

export default class CodeShow extends Component {

    id = Math.round(Math.random() * 100000);

    lists = []

    constructor() {
        super()

        this.getLists = this.getLists.bind(this)
        this.getSteps = this.getSteps.bind(this)
        this.animateNext = this.animateNext.bind(this)
        this.animatePrev = this.animatePrev.bind(this)
        this.getRefs = this.getRefs.bind(this)

        this.state = {
            stepNumber: -1,
            showLineNumbers: false
        }
        this.lists = this.getLists()
    }
    componentDidUpdate() {
        console.log('UPDATE')
    }
    componentWillMount() {
        console.log('MOUNT')
        this.refs = this.getRefs()
        console.log(this.refs)
        this.setState({ lists: this.getLists(), stepNumber: -1 })
        this.lists = this.getLists()
    }

    componentDidMount() {
        console.log('MOUNTED')

        document.body.addEventListener('keydown', (evt) => {
            // console.log(evt)
            const key = evt.key
            if (key === "ArrowLeft")
                this.animatePrev()
            else if (key === "ArrowRight")
                this.animateNext()
        })
    }

    render() {
        return (
            <div className="show">
                {/* {this.state.stepNumber} */}
                <div className="show-code-box">
                    <div className="show-code">
                        <pre>
                            <code>
                                {this._renderCode()}
                            </code>
                        </pre>
                    </div>
                </div>
                <div className="lists">
                    {this.state.lists}
                </div>
            </div>
        )
    }

    _renderCode() {

        const code = this.getCode();

        if (code) {
            const linesOfCode = code.split(/\r?\n/)
            const lines = linesOfCode.map((line, i) => (<span key={i} data-line={i}>{line}{"\n"}</span>))
            return (
                <div className={`code-lines ${this.state.showLineNumbers ? 'display-numbers' : ''}`}>{lines}</div>
            )
        }

        return (
            this.renderCode()
        )

    }

    animateNext() {
        const steps = this.getSteps.apply(this)
        const stepNumber = this.state.stepNumber + 1
        if (stepNumber >= steps.length)
            return
        const step = steps[stepNumber]
        if (typeof step !== 'function')
            return
        try {
            step.call(this)
        } catch (e) {
            console.error(e)
        }
        this.lists.forEach(list => {
            list.ref.current.endStep(stepNumber)
        })
        this.setState({ stepNumber })
    }

    animatePrev() {
        const steps = this.getSteps.apply(this)
        const stepNumber = this.state.stepNumber - 1
        if (stepNumber < -1)
            return
        this.lists.forEach(list => {
            list.ref.current.loadStep(stepNumber)
        })
        this.setState({ stepNumber })
    }


    // inteface

    getTitle() {
        return "";
    }

    renderCode() {
        return (<div></div>)
    }

    getCode() {
        return null
    }

    getLists() {
        return []
    }

    getSteps() {
        return []
    }
    getRefs() {
        return {}
    }

}