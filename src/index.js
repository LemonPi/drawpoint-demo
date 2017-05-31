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

import {CurveClosing} from "./sections/closing";
import closingReadme from './sections/closing/README.md';

import {GetPoint} from "./sections/get";
import getReadme from './sections/get/README.md';

import {SplitCurveCubic, SplitCurveQuadratic} from "./sections/split";
import splitReadme from './sections/split/README.md';

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
        <Section>
            <div>
                <CurveClosing/>
            </div>
            <Markdown path={closingReadme}/>
        </Section>
        <Section>
            <div>
                <GetPoint t={0.5}/>
            </div>
            <Markdown path={getReadme}/>
        </Section>
        <Section>
            <div>
                <SplitCurveQuadratic t={0.5}/>
                <SplitCurveCubic t={0.5}/>
            </div>
            <Markdown path={splitReadme}/>
        </Section>
    </div>,
    document.getElementById('root')
);