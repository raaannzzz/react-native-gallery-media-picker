import React, { Component, useState } from "react";
import { ScrollView, FlatList } from "react-native";

import AlbumItem from "../AlbumItem";
import styles from "./styles";

const AlbumsList = props => {
  const { albums } = props;

  const renderThisItems = (item, index) => {
    return (
      <AlbumItem
        key={index}
        albumName={item.albumName}
        thumbnail={item.images[0].image.uri}
        counter={item.images.length || 0}
        index={index}
        onAlbumPress={props.onAlbumPress}
      />
    );
  };

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: "black" }}
      data={albums}
      renderItem={({ item, index }) => renderThisItems(item, index)}
      keyExtractor={({ item, index }) => index}
      numColumns={2}
    />
  );
};

export default AlbumsList;
