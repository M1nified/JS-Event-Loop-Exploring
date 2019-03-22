import React, { Component } from 'react'
import './ScenarioPlayer.css'

export default class ScenarioPlayer extends Component {

    state = {
        showId: null,
        show: null
    }

    constructor({ show }) {
        super()
        // const showId = match.params.showId
        this.state = { show }
        console.log(show)
    }

    render() {
        const { id, ShowComponent } = this.state.show;

        
        if (ShowComponent) {

            return (
                <div className="scenario-player">
                    {/* {id} */}
                    <ShowComponent />
                </div>
            )
        }
        return (
            <div className="scenario-player">
                No such show.
        </div>
        )
    }

}
