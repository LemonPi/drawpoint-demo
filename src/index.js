/**
 * Created by Johnson on 2017-05-20.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Markdown from "./Markdown";
import Section from "./Section";

import {
    CubicConstruction,
    QuadraticConstruction,
    LinearConstruction
} from "./sections/construction";
import constructionReadme from './sections/construction/README.md';

import {CurveChaining} from "./sections/chaining";
import chainingReadme from './sections/chaining/README.md';


ReactDOM.render(
    <div>
        <Section>
            <div>
                <LinearConstruction/>
                <QuadraticConstruction/>
                <CubicConstruction/>
            </div>
            <Markdown path={constructionReadme}/>
        </Section>
        <Section>
            <div>
                <CurveChaining/>
            </div>
            <Markdown path={chainingReadme}/>
        </Section>
    </div>,
    document.getElementById('root')
);