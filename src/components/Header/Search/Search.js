import React, { Component }from "react";
import "../Search/Search.css"

class Search extends Component {
    render() {
        const {getSearchData} = this.props;
        return (
            <section className = "search">
                <form onSubmit = {getSearchData}>
                    <input type = "text" name= "search" />
                    <button>Search</button>
                </form>
            </section>
        )
    }
}
export { Search };