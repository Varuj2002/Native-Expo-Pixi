import React, { useState, useEffect } from 'react';
import {
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    Dimensions,
    PixelRatio,
    TouchableHighlight,
    Text
} from 'react-native';
import { FilterImage, PIXI } from 'expo-pixi';

import Phot from './kylie.png';

const { width, height } = Dimensions.get('window');
const scale = PixelRatio.get();

const colorMatrix = [
    { name: 'reset' },
    {
        name: 'brightness',
        tools: [{ type: 'number', min: 0, max: 1, standard: 0.3 }],
    },
    {
        name: 'greyscale',
        tools: [{ type: 'number', min: 0, max: 1, standard: 0.6 }],
    },
    { name: 'blackAndWhite' },
    { name: 'hue', tools: [{ type: 'number', min: 0, max: 360, standard: 180 }] },
    {
        name: 'contrast',
        tools: [{ type: 'number', min: 0, max: 1, standard: 0.8 }],
    },
    {
        name: 'saturate',
        tools: [{ type: 'number', min: 0, max: 1, standard: 0.8 }],
    },
    { name: 'desaturate' },
    { name: 'negative' },
    { name: 'sepia' },
    { name: 'technicolor', tools: [{ type: 'boolean', standard: true }] },
    { name: 'polaroid' },
    { name: 'toBGR' },
    { name: 'kodachrome', tools: [{ type: 'boolean', standard: true }] },
    { name: 'browni', tools: [{ type: 'boolean', standard: true }] },
    { name: 'vintage', tools: [{ type: 'boolean', standard: true }] },
    {
        name: 'colorTone',
        tools: [
            { type: 'number', min: 0, max: 1, standard: 0.5 },
            { type: 'number', min: 0, max: 1, standard: 0.5 },
            { type: 'color', standard: '0xff0000' },
            { type: 'color', standard: '0x000011' },
        ],
    },
    { name: 'night', tools: [{ type: 'number', min: 0, max: 1, standard: 0.5 }] },
    {
        name: 'predator',
        tools: [{ type: 'number', min: 0, max: 1, standard: 0.5 }],
    },
    { name: 'lsd' },
];

const Pixi = () => {
    const [index, setIndex] = useState(0);
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        const parsedFilters = colorMatrix.map(({ name, tools }) => {
            const filter = new PIXI.filters.ColorMatrixFilter();
            if (tools) {
                tools.forEach(tool => {
                    filter[name](...Object.values(tool));
                });
            } else {
                filter[name]();
            }
            return filter;
        });

        setFilters(parsedFilters);
    }, []);

    const changeFilter = () => {
        const newIndex = (index + 1) % filters.length;
        setIndex(newIndex);
    };

    const filter = filters[index];
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={1}
                style={styles.touchable} onPress={changeFilter}>
                <Text>changeFilter</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1}
                style={styles.touchable} onPress={changeFilter}>
                <FilterImage
                    source={Phot}
                    resizeMode={'cover'}
                    style={styles.image}
                    filters={Number(filters[0])}
                />
            </TouchableOpacity>
        </View>
    );
};

export default Pixi;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchable: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
    },
    image: {
        width: width * 0.9,
        height: height * 0.9,
    },
});
