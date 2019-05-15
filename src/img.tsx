/**
 * Created by horat1us on 6/17/17.
 */
import React, {Component} from 'react';
import ReactImageLightbox, {changeAngle} from './override';
// import Lightbox, {ILightBoxProps} from 'react-image-lightbox';
import PropTypes from 'prop-types';

import './styles.css';
interface Interface {
    onPreMovePrevRequest:any
    onImageRotate:any
    saveBeforeAfterState:any
    onPreMoveNextRequest:any
}
interface Interface2 {
    rotate:any
    prevRotate:any
    nextRotate:any
}
// const ReactImageLightbox=Lightbox;
/**
 * Class ReactImageLightboxRotate
 */
class ReactImageLightboxRotate extends Component<Interface,Interface2> {
    constructor(props:any) {
        super(props);

        this.state = {
            rotate: 0,
            prevRotate: 0,
            nextRotate: 0,
        };
    }

    changeRotation(angle:any) {
        let nextAngle = this.state.rotate + angle;
        if (nextAngle < 0) {
            nextAngle = 270;
        }
        this.setState({rotate: nextAngle});
        this.props.onImageRotate(nextAngle);
    }

    resetRotation() {
        this.setState({rotate: 0});
    }

    preservationRotation(angle:any) {
        this.setState({rotate: angle});
    }

    resetPrevRotation() {
        this.setState({prevRotate: 0});
    }

    preservationPrevRotation(angle:any) {
        this.setState({prevRotate: angle});
    }

    resetNextRotation() {
        this.setState({nextRotate: 0});
    }

    preservationNextRotation(angle:any) {
        this.setState({nextRotate: angle});
    }

    get svg() {
        return <svg className="icon icon-rotate" xmlns="http://www.w3.org/2000/svg" width="512"
                    height="512"
                    viewBox="0 0 16 16">
            <path fill="#ddd"
                  d="M16 7V3l-1.1 1.1C13.6 1.6 11 0 8 0 3.6 0 0 3.6 0 8s3.6 8 8 8c2.4 0 4.6-1.1 6-2.8l-1.5-1.3C11.4 13.2 9.8 14 8 14c-3.3 0-6-2.7-6-6s2.7-6 6-6c2.4 0 4.5 1.5 5.5 3.5L12 7h4z"/>
        </svg>;
    }

    handleMovePrev() {
        if(this.props.onPreMovePrevRequest && (this.state.rotate >0 || this.state.prevRotate > 0)){
            return () => {
                if (this.state.prevRotate > 0) {
                    this.preservationRotation(this.state.prevRotate);
                    this.resetPrevRotation();
                }else {
                    if(this.props.saveBeforeAfterState){
                        this.preservationNextRotation(this.state.rotate);
                    }

                    this.resetRotation();
                    changeAngle(0);
                }
                this.props.onPreMovePrevRequest();
            };
        }
        return this.props.onPreMovePrevRequest
    }

    handleMoveNext() {
        if(this.props.onPreMoveNextRequest && this.state.rotate >0 ||  this.state.nextRotate > 0){
            return () => {
                if(this.state.nextRotate > 0) {
                    this.preservationRotation(this.state.nextRotate);
                    this.resetNextRotation();
                } else {
                    if(this.props.saveBeforeAfterState){
                        this.preservationPrevRotation(this.state.rotate);
                    }
                    this.resetRotation();
                    changeAngle(0);
                }
                this.props.onPreMoveNextRequest();
            };
        }else{
            return () => {
                this.resetPrevRotation();
                this.props.onPreMoveNextRequest();
            }
        }
    }

    render() {
        const noop = () => {
        };

        const rotateRightButtonClasses = [
            // @ts-ignore
            ReactImageLightbox.toolbarItemChild,
            // @ts-ignore
            ReactImageLightbox.builtinButton,
            'rotateRightButton'
        ];
        const rotateLeftButtonClasses = [
            // @ts-ignore
            ReactImageLightbox.toolbarItemChild,
            // @ts-ignore
            ReactImageLightbox.builtinButton,
            'rotateLeftButton'
        ];

        let rotateLeftButtonHandler = () => this.changeRotation(-90);
        let rotateRightButtonHandler = () => this.changeRotation(90);

        // @ts-ignore
        if (this.lightBox && this.lightBox.isAnimating()) {
            rotateLeftButtonHandler = noop;
            rotateRightButtonHandler = noop;
        }

        changeAngle(this.state.rotate);
        // @ts-ignore
        let toolbarButtons = this.props.toolbarButtons ? this.props.toolbarButtons : []
        toolbarButtons = toolbarButtons.concat(
            [
                <button
                    type="button"
                    key="rotate-left"
                    className={`ril-rotate-left ${rotateLeftButtonClasses.join(' ')}`}
                    onClick={rotateLeftButtonHandler}
                >
                    {this.svg}
                </button>,
                <button
                    type="button"
                    key="rotate-right"
                    className={`ril-rotate-right ${rotateRightButtonClasses.join(' ')}`}
                    onClick={rotateRightButtonHandler}
                >
                    {this.svg}
                </button>
            ]
        )
        const props = Object.assign({}, this.props, {
            onMovePrevRequest: this.handleMovePrev(),
            onMoveNextRequest: this.handleMoveNext(),
            toolbarButtons,
            // @ts-ignore
            ref: (lightBox) => this.lightBox = lightBox,
            // @ts-ignore
            wrapperClassName: this.rotateClassName,
        });
        // @ts-ignore
        return <ReactImageLightbox {...props} />
    }
}
// @ts-ignore
ReactImageLightboxRotate.defaultProps = Object.assign({}, ReactImageLightbox.defaultProps, {
    onImageRotate: () => {
    },
});
// @ts-ignore
ReactImageLightboxRotate.propTypes = Object.assign({}, ReactImageLightbox.propTypes, {
    onImageRotate: PropTypes.func,
});

export default ReactImageLightboxRotate;
