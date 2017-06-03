/**
 * Created by Johnson on 2017-05-20.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Markdown from "./Markdown";
import Section from "./Section";

import topReadme from "./README.md";

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

import {ElevateQuadratic} from "./sections/elevate";
import elevateReadme from './sections/elevate/README.md';

import {
    SmoothContinuationCubicQuadratic,
    SmoothContinuationQuadraticCubic
} from "./sections/smooth_continuation";
import smoothContinuationReadme from './sections/smooth_continuation/README.md';
import {SmoothContinuationLinearCubic} from "./sections/smooth_continuation/index";

import {ScalePoints} from "./sections/scale";
import scaleReadme from "./sections/scale/README.md";

import {RotatePoints} from "./sections/rotate";
import rotateReadme from "./sections/rotate/README.md";

import {InterpolateX, InterpolateY} from "./sections/interpolate";
import interpolateReadme from "./sections/interpolate/README.md";

import {TransformCurveCubicQuadratic, TransformCurveCubicLinear} from "./sections/transform";
import transformReadme from "./sections/transform/README.md";

ReactDOM.render(
    <div>
        <Section>
            <Markdown path={topReadme}/>
        </Section>
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
                <SmoothContinuationCubicQuadratic by={1}/>
                <SmoothContinuationQuadraticCubic by={1}/>
                <SmoothContinuationLinearCubic by={1}/>
            </div>
            <Markdown path={smoothContinuationReadme}/>
        </Section>
        <Section>
            <div>
                <SplitCurveQuadratic t={0.5}/>
                <SplitCurveCubic t={0.5}/>
            </div>
            <Markdown path={splitReadme}/>
        </Section>
        <Section>
            <div>
                <ScalePoints by={1}/>
            </div>
            <Markdown path={scaleReadme}/>
        </Section>
        <Section>
            <div>
                <RotatePoints rad={1}/>
            </div>
            <Markdown path={rotateReadme}/>
        </Section>
        <Section>
            <div>
                <GetPoint t={0.5}/>
            </div>
            <Markdown path={getReadme}/>
        </Section>
        <Section>
            <div>
                <InterpolateX x={100}/>
                <InterpolateY y={100}/>
            </div>
            <Markdown path={interpolateReadme}/>
        </Section>
        <Section>
            <div>
                <TransformCurveCubicQuadratic by={0.5}/>
                <TransformCurveCubicLinear by={0.5}/>
            </div>
            <Markdown path={transformReadme}/>
        </Section>
        <Section>
            <div>
                <ElevateQuadratic/>
            </div>
            <Markdown path={elevateReadme}/>
        </Section>
    </div>,
    document.getElementById('root')
);