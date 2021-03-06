import React, { Component, useState } from "react";
import { ScrollView, FlatList, View } from "react-native";
import Header from "../../Header";

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

  const onBack = () => {};

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <Header
        title={`Send to ${props.headerName}`}
        onBack={onBack}
        backCaption=""
      />
      <FlatList
        style={{ flex: 1, backgroundColor: "black", marginTop: -5 }}
        data={albums}
        renderItem={({ item, index }) => renderThisItems(item, index)}
        keyExtractor={({ item, index }) => index}
        numColumns={2}
      />
    </View>
  );
};

export default AlbumsList;
