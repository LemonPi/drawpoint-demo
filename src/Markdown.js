/**
 * Created by Johnson on 2017-05-25.
 */
import marked from "marked";
import React from 'react';

export default class Markdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {markdown: ""};
    }

    componentWillMount() {
        fetch(this.props.path)
        .then(response => {
            return response.text()
        })
        .then(text => {
            const markdown = marked(text, {sanitize: true});
            this.setState({markdown});
        });
    }

    render() {
        return (
            <article className="markdown"
                     dangerouslySetInnerHTML={{__html: this.state.markdown}}></article>
        )
    }
}