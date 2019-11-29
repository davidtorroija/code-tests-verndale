import React, { Component } from "react";
import PropTypes from "prop-types";
import "isomorphic-fetch";
import { debounce } from "../utils/index";

class Autocomplete extends Component {
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array)
    };

    static defaultProps = {
        suggestions: []
    };

    constructor(props) {
        super(props);

        this.state = {
            // The active selection's index
            activeSuggestion: 0,
            // The suggestions that match the user's input
            filteredSuggestions: [],
            // Whether or not the suggestion list is shown
            showSuggestions: false,
            // What the user has entered
            userInput: "",

            pepe: [],
        };

        // this.onChange = debounce(this.onChange.bind(this),500)
    }

    // Event fired when the input value is changed
    onChange = async e => {
        e.persist();
        // const { suggestions } = this.props;
        const userInput = e.currentTarget.value;

        if (userInput.length < 3) {
            this.setState({
                userInput: e.currentTarget.value,
                showSuggestions: false,
                activeSuggestion: 0,
            });
            return;
        }

        const response = await fetch(`http://localhost:3000/api/states?term=${userInput}`)
        const suggestions = (await response.json()).data;
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: suggestions.map(state => state.name),
            showSuggestions: true,
            userInput: userInput
        });

    };

    // Event fired when the user clicks on a suggestion
    onClick = e => {
        // Update the user input and reset the rest of the state
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });
    };

    // Event fired when the user presses a key down
    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        // User pressed the enter key, update the input and close the
        // suggestions
        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
            });
        }
        // User pressed the up arrow, decrement the index
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        // User pressed the down arrow, increment the index
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };

    resetSearch = () => {
        this.setState({
            userInput: "",
            showSuggestions: false,
            activeSuggestion: 0,
        });
    };

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            resetSearch,
            state: { activeSuggestion, filteredSuggestions, showSuggestions, userInput }
        } = this;

        let { width } = this.props;

        //default value for width if not overrided
        width = width || "300px";

        let suggestionsListComponent;

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className="Autocomplete__suggestions" style={{width: (parseFloat(width) + 30) + "px" }}>
                        {filteredSuggestions.map((suggestion, index) => {
                            let className = "Autocomplete__suggestion";

                            // Flag the active suggestion with a class
                            if (index === activeSuggestion) {
                                className += "--active";
                            }

                            return (
                                <li className={className} key={suggestion} onClick={onClick}>
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } 
        }

        return (
            <div className="Autocomplete" style={{width}}>
                <input  
                    className="Autocomplete__input"
                    placeholder="Search States" 
                    type="text" 
                    onChange={onChange} 
                    onKeyDown={onKeyDown} 
                    value={userInput} 
                    style={{width}}
                />
                { userInput ? <button className="Autocomplete__close-button" onClick={resetSearch}>x</button> : null }
                {suggestionsListComponent}
            </div>
        );
    }
}

export default Autocomplete;
