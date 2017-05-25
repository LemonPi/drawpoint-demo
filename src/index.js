/**
 * Created by Johnson on 2017-05-20.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Markdown from "./Markdown";
import Section from "./Section";

import {CubicConstruction} from "./sections/construction";
import constructionReadme from './sections/construction/README.md';


ReactDOM.render(
    <Section title="Construction">
        <CubicConstruction/>
        <Markdown path={constructionReadme}/>
    </Section>,
    document.getElementById('root')
);