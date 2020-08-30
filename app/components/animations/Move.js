import React, { Component } from 'react'
import { Animated } from 'react-native'

class Move extends Component {
    constructor (props) {
        super(props)
        this.state = {
            pan: new Animated.ValueXY({ x: this.props.xD, y: this.props.yD }),
            opacity: new Animated.Value(0)
        }
    }

    componentDidMount () {
        setTimeout(() => this.activeAnimation(), 500)
    }

    activeAnimation () {
        Animated.parallel([
            Animated.delay(this.props.delais),
            Animated.spring(
                this.state.pan,
                {
                    friction: 30,
                    tension: 20,
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false,
                }
            ),
            Animated.spring(this.state.opacity, {
                toValue: 1,
                    useNativeDriver: false,
            })
        ]).start()

        // Animated.parallel([
        //     Animated.delay(this.props.delais),
        //     Animated.spring(
        //         this.state.pan,
        //         {
        //             toValue: { x: 0, y: 0 }
        //         }
        //     )
        // ]).start()
        // Animated.spring(
        //     this.state.pan,
        //     {
        //         toValue: { x: 0, y: 0 }
        //     }
        // ).start()
    }

    render () {
        return (
            <Animated.View
                style={{
                    transform: this.state.pan.getTranslateTransform(),
                    opacity: this.state.opacity,
                    ...this.props.styles,
                }}>
                { this.props.children }
            </Animated.View>
        )
    }
}

export default Move
