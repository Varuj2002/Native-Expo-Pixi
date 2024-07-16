import React, { useEffect, useState } from 'react';
import { Text, ScrollView, TouchableOpacity } from 'react-native';
import { GLView } from 'expo-gl';
import { PIXI } from 'expo-pixi';


const PixiAnimation = () => {
    const [rotationActive, setRotationActive] = useState(false);
    const [cont, setCont] = useState(null)

    const toggleRotation = () => {
        setRotationActive(true);
    };

    const rotation = async (context) => {
        const a = Math.floor(Math.random() * 9) + 1
        const b = (Math.floor(Math.random() * 9) + 1) / 100
        const app = new PIXI.Application({ context });
        const sprite = await PIXI.Sprite.fromExpoAsync(
            require('./kylie.png')
        );
        app.stage.addChild(sprite);

        sprite.anchor.set(0.5);

        sprite.x = app.screen.width / 4;
        sprite.y = app.screen.height / 4;
        if (rotationActive) {
            app.ticker.add(() => {
                if (rotationActive) {

                    if (sprite.rotation < a) {
                        sprite.rotation += b;
                    } else {
                        setRotationActive(false)
                    }
                    // console.log('sprite.rotation', sprite.rotation)
                }
            });
        }
    }

    useEffect(() => {
        if (cont && rotationActive) {
            rotation(cont)
        }

    }, [rotationActive, cont])

    return (
        <ScrollView>
            <GLView style={{ width: 800, height: 800, backgroundColor: 'yellow' }}
                onContextCreate={async context => {
                    setCont(context)
                    rotation(context)

                }}
            />
            <TouchableOpacity style={{
                padding: 10,
                borderWidth: 1
            }} onPress={toggleRotation}>
                <Text>Spin</Text>
            </TouchableOpacity>

        </ScrollView>

    );
};



export default PixiAnimation;

