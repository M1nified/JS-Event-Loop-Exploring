import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ScenarioPlayer from './ScenarioPlayer'
import CodeShow from './Show/CodeShow'
import HorizontalList from './Show/HorizontalList'

const shows = [
    {
        id: 1,
        ShowComponent: class extends CodeShow {
            id = 1
            getCode() {
                return `button.addEventListener('click', () => {
    Promise.resolve().then(() => console.log('Microtask 1'))
    console.log('Click listener 1')
})

button.addEventListener('click', () => {
    Promise.resolve().then(() => console.log('Microtask 2'))
    console.log('Click listener 2')
})`
            }
            getLists() {
                console.log(this.refs)
                return [
                    <HorizontalList ref={this.refs.refListJsStack} title="JS Stack" key="1" />,
                    <HorizontalList ref={this.refs.refListTasks} title="Tasks" key="2" />,
                    <HorizontalList ref={this.refs.refListLog} title="Log" key="3" />,
                ]
            }

            getSteps() {
                if (this.lists)
                    return [
                        () => {
                            this.lists[0].ref.current.push("Listener 1")
                        },
                        () => {
                            this.lists[1].ref.current.push("promise.then(Listener 1)")
                            this.lists[2].ref.current.push("Listener 1")
                        },
                        () => {
                            this.lists[0].ref.current.shift()
                        },
                        () => {
                            this.lists[0].ref.current.push("promise.then(Listener 1)")
                        },
                        () => {
                            this.lists[2].ref.current.push("Microtask 1")
                        },
                        () => {
                            this.lists[0].ref.current.shift()
                            this.lists[1].ref.current.pop()
                        },
                        //
                        () => {
                            this.lists[0].ref.current.push("Listener 2")
                        },
                        () => {
                            this.lists[1].ref.current.push("promise.then(Listener 2)")
                            this.lists[2].ref.current.push("Listener 2")
                        },
                        () => {
                            this.lists[0].ref.current.shift()
                        },
                        () => {
                            this.lists[0].ref.current.push("promise.then(Listener 2)")
                        },
                        () => {
                            this.lists[2].ref.current.push("Microtask 2")
                        },
                        () => {
                            this.lists[0].ref.current.shift()
                            this.lists[1].ref.current.pop()
                        },
                    ]
                return []
            }
            getRefs() {
                return {
                    refListJsStack: React.createRef(),
                    refListTasks: React.createRef(),
                    refListLog: React.createRef(),
                }
            }
        }
    },
    {
        id: 2,
        ShowComponent: class extends CodeShow {
            id = 2
            getCode() {
                return `button.addEventListener('click', () => {
    Promise.resolve().then(() => console.log('Microtask 1'))
    console.log('Click listener 1')
})

button.addEventListener('click', () => {
    Promise.resolve().then(() => console.log('Microtask 2'))
    console.log('Click listener 2')
})

button.click()
`
            }
            getLists() {
                console.log(this.refs)
                return [
                    <HorizontalList ref={this.refs.refListJsStack} title="JS Stack" key="1" />,
                    <HorizontalList ref={this.refs.refListTasks} title="Tasks" key="2" />,
                    <HorizontalList ref={this.refs.refListLog} title="Log" key="3" />,
                ]
            }

            getSteps() {
                if (this.lists)
                    return [
                        () => {
                            this.lists[0].ref.current.unshift("button.click()")
                        },
                        () => {
                            this.lists[0].ref.current.unshift("Listener 1")
                        },
                        () => {
                            this.lists[1].ref.current.push("promise.then(Listener 1)")
                            this.lists[2].ref.current.push("Listener 1")
                        },
                        () => {
                            this.lists[0].ref.current.shift()
                        },
                        () => {
                            this.lists[0].ref.current.unshift("Listener 2")
                        },
                        () => {
                            this.lists[1].ref.current.push("promise.then(Listener 2)")
                            this.lists[2].ref.current.push("Listener 2")
                        },
                        () => {
                            this.lists[0].ref.current.shift()
                        },
                        () => {
                            this.lists[0].ref.current.shift()
                        },
                        () => {
                            this.lists[0].ref.current.unshift("promise.then(Listener 1)")
                        },
                        () => {
                            this.lists[2].ref.current.push("Microtask 1")
                        },
                        () => {
                            this.lists[0].ref.current.shift()
                            this.lists[1].ref.current.shift()
                        },
                        () => {
                            this.lists[0].ref.current.unshift("promise.then(Listener 2)")
                        },
                        () => {
                            this.lists[2].ref.current.push("Microtask 2")
                        },
                        () => {
                            this.lists[0].ref.current.shift()
                            this.lists[1].ref.current.shift()
                        },
                    ]
                return []
            }
            getRefs() {
                return {
                    refListJsStack: React.createRef(),
                    refListTasks: React.createRef(),
                    refListLog: React.createRef(),
                }
            }
        }
    }
]

export default class Scenarios extends Component {

    state = {
        shows
    }

    constructor() {
        super()
        console.log(this.state)
    }

    render() {
        return (

            <Router>
                <div>
                    <Route exact path='/' render={() => (
                        <div className="menu">
                            {this.state.shows.map(({ id }) =>
                                <div key={id}><Link to={`/show/${id}`} key={id}>{id}</Link></div>
                            )}
                        </div>
                    )}>
                    </Route>
                    <Route path='/show/:showId' render={({ match }) => (
                        <ScenarioPlayer show={this.state.shows.find(({ id }) => id == match.params.showId)} />
                    )} />
                </div>
            </Router>

        )
    }

}

