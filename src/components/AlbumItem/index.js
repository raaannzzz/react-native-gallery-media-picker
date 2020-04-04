import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";

import styles from "./styles";
// const checkedIcon = require("../../assets/images/check-mark.png");

const AlbumItem = props => {
  const { albumName, thumbnail, counter, index } = props;

  return (
    <TouchableOpacity
      style={[styles.base, index === 0 && styles.first]}
      onPress={() => this.props.onAlbumPress(albumName)}
    >
      <ImageBackground source={{ uri: thumbnail }} style={styles.thumb}>
        <View style={styles.textWrapper}>
          <Text style={styles.name}>{albumName}</Text>
          <Text style={styles.counter}>{counter}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default AlbumItem;
