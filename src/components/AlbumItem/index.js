import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";

import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";

const AlbumItem = props => {
  const { albumName, thumbnail, counter, index } = props;

  return (
    <TouchableOpacity
      style={[styles.base, index === 0 && styles.first]}
      onPress={() => this.props.onAlbumPress(albumName)}
    >
      <ImageBackground source={{ uri: thumbnail }} style={styles.thumb}>
        <LinearGradient
          colors={["transparent", "rgba(0, 0, 0, 1)"]}
          style={{
            height: 28,
            position: "absolute", // child
            bottom: 0, // position where you want,
            right: 0,
            left: 0
          }}
        >
          <Text style={styles.name}>{albumName}</Text>
          <Text style={styles.counter}>{counter}</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default AlbumItem;
