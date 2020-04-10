import React, { Component, useState, useEffect } from "react";
import { Platform, View } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import _ from "lodash";
import AlbumsList from "../src/components/AlbumsList";
import MediaList from "../src/components/MediaList";
import styles from "./styles";

const GalleryMediaPicker = props => {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(props.selected);
  const [lastCursor, setLastCursor] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [noMoreFiles, setNoMoreFiles] = useState(false);
  const [batchSize, setBatchSize] = useState(1);
  const [dataSource, setDataSource] = useState([]);
  const [groupTypes, setGroupTypes] = useState("SavedPhotos");
  const [maximumSelectedFiles, setMaximumSelectedFiles] = useState(15);
  const [itemsPerRow, setItemsPerRow] = useState(3);
  const [imageMargin, setImageMargin] = useState(5);
  const [activityIndicatorSize, setActivityIndicatorSize] = useState("small");
  const [activityIndicatorColor, setActivityIndicatorColor] = useState(
    "#000000"
  );
  const [selectSingleItem, setSelectSingleItem] = useState(false);
  const [assetType, setAssetType] = useState("Photos");
  const [backgroundColor, setBackgroundColor] = useState("black");
  const [emptyGalleryText, setEmptyGalleryText] = useState(
    "There are no photos or videos"
  );
  const [albums, setAlbums] = useState([]);
  const [albumSelected, setAlbumSelected] = useState("");

  useEffect(() => {
    getFiles();
  }, []);

  useEffect(() => {
    if (loadingMore) {
      getCameraRollFiles();
    }
  }, [loadingMore]);

  useEffect(() => {
    setSelected(props.selected);
  }, [props.selected]);

  const getFiles = () => {
    if (!loadingMore) {
      setLoadingMore(true);
    }
  };

  const getCameraRollFiles = () => {
    const { groupTypes, assetType, firstLimit } = props;

    const fetchParams = {
      first: firstLimit !== undefined ? firstLimit : 2000,
      groupTypes: groupTypes,
      assetType: assetType
    };

    if (Platform.OS === "android") {
      delete fetchParams.groupTypes;
    }

    if (lastCursor) {
      fetchParams.after = lastCursor;
    }

    CameraRoll.getPhotos(fetchParams).then(
      data => appendFiles(data),
      e => console.error(e)
    );
  };

  const appendFiles = data => {
    const assets = data.edges;

    extract(assets);

    // let newState = {
    //   loadingMore: false,
    //   fetching: false,
    // };

    if (!data.page_info.has_next_page) {
      // newState.noMoreFiles = true;
      setNoMoreFiles(true);
    }

    if (assets.length > 0) {
      // newState.lastCursor = data.page_info.end_cursor;
      // newState.images = images.concat(assets);
      setLastCursor(data.page_info.end_cursor);
      setImages(images.concat(assets));
    }

    setLoadingMore(false);
    setFetching(false);
  };

  /**
   * @description Extracts images from array
   */
  const extract = items => {
    const res = items.map(item => item.node);
    sort(res);
  };
  /**
   * @description Sorts images based on album
   */
  const sort = items => {
    let albums = [];
    let grouped = Object.values(_.groupBy(items, item => item.group_name));
    grouped.map(list =>
      albums.push({ albumName: list[0].group_name, images: list })
    );

    setAlbums(albums);
  };

  const selectAlbum = albumName => {
    setAlbumSelected(albumName);
  };

  const deselectAlbum = () => {
    setAlbumSelected("");
  };

  const getAlbumImages = selectedAlbumName => {
    const selectedAlbum = albums
      .filter(album => album.albumName === selectedAlbumName)
      .pop();

    return selectedAlbum.images;
  };

  /**
   * @description Render background color for the container
   * @return {string}
   */
  const renderBackgroundColor = () => {
    return props.backgroundColor !== undefined
      ? props.backgroundColor
      : backgroundColor;
  };

  /**
   * @description Render default loader style
   * @return {{color: string, size: string}}
   */
  const renderLoaderStyle = () => {
    return {
      color:
        props.activityIndicatorColor !== undefined
          ? props.activityIndicatorColor
          : activityIndicatorColor,
      size:
        props.activityIndicatorSize !== undefined
          ? props.activityIndicatorSize
          : activityIndicatorSize
    };
  };

  /**
   * @description On list end reached , load more files if there are any
   */
  const onEndReached = () => {
    if (!noMoreFiles) {
      getFiles();
    }
  };

  const renderMedia = () => {
    if (!albumSelected) {
      return (
        <AlbumsList
          albums={albums}
          onAlbumPress={albumName => selectAlbum(albumName)}
        />
      );
    } else {
      return (
        <MediaList
          images={getAlbumImages(albumSelected)}
          itemsPerRow={props.itemsPerRow}
          selected={props.selected}
          onBackPress={() => deselectAlbum()}
          callback={props.callback}
          batchSize={props.batchSize}
          // selectMediaFile={selectMediaFile}
          imageMargin={props.imageMargin}
          markIcon={props.markIcon}
          customSelectMarker={props.customSelectMarker}
          activityIndicatorColor={activityIndicatorColor}
          maximumSelectedFiles={
            props.maximumSelectedFiles || maximumSelectedFiles
          }
        />
      );
    }
  };

  return <View style={styles.base}>{renderMedia()}</View>;
};

// class GalleryMediaPicker extends Component {
//   constructor( props ) {
//     super( props );

//     this.state = {
//       images:                    [],
//       selected:                  this.props.selected,
//       lastCursor:                null,
//       fetching:                  true,
//       loadingMore:               false,
//       noMoreFiles:               false,
//       batchSize:                 1,
//       dataSource:                [],
//       groupTypes:                'SavedPhotos',
//       maximumSelectedFiles:      15,
//       itemsPerRow:               3,
//       imageMargin:               5,
//       activityIndicatorSize:     'small',
//       activityIndicatorColor:    '#000000',
//       selectSingleItem:          false,
//       assetType:                 'Photos',
//       backgroundColor:           'black',
//       emptyGalleryText:          'There are no photos or videos',
//       albums:                    [],
//       albumSelected:             ''
//     };
//   }

//   componentWillMount() {
//     this.getFiles();
//   }

//   componentWillReceiveProps( nextProps ) {
//     this.setState( { selected: nextProps.selected } );
//   }

//   /**
//    * @description Get files from camera roll
//    */
//   getFiles () {
//     if (!this.state.loadingMore) {
//       this.setState({loadingMore: true}, () => {
//         this.getCameraRollFiles();
//       });
//     }
//   }

//   /**
//    * @description Fetch camera roll files
//    */
//   getCameraRollFiles() {
//     let { groupTypes, assetType, firstLimit } = this.props;

//     let fetchParams = {
//       first: firstLimit !== undefined ? firstLimit : 1000,
//       groupTypes: groupTypes,
//       assetType: assetType,
//     };

//     if (Platform.OS === "android") {
//       delete fetchParams.groupTypes;
//     }

//     if (this.state.lastCursor) {
//       fetchParams.after = this.state.lastCursor;
//     }

//     CameraRoll.getPhotos(fetchParams)
//       .then((data) => this.appendFiles(data), (e) => console.error(e));
//   }

//   /**
//    * @description This function is sorting files and put them on the state
//    * @param data
//    */
//   appendFiles(data) {
//     let assets = data.edges;

//     this.extract(assets);

//     let newState = {
//       loadingMore: false,
//       fetching: false,
//     };

//     if (!data.page_info.has_next_page) {
//       newState.noMoreFiles = true;
//     }

//     if (assets.length > 0) {
//       newState.lastCursor = data.page_info.end_cursor;
//       newState.images = this.state.images.concat(assets);
//     }

//     this.setState(newState);
//   }

//   /**
//    * @description Extracts images from array
//    */
//   extract (items) {
//     let res = items.map(item => item.node);
//     this.sort(res);
//   }

//   /**
//    * @description Sorts images based on album
//    */
//   sort (items) {
//     let albums = [];
//     grouped = Object.values(_.groupBy(items, (item) => item.group_name));
//     grouped.map(list => albums.push({albumName: list[0].group_name, images: list}));

//     this.setState({
//       albums
//     });
//   }

//   selectAlbum (albumName) {
//     this.setState({
//       albumSelected: albumName
//     });
//   }

//   deselectAlbum () {
//     this.setState({
//       albumSelected: ''
//     });
//   }

//   getAlbumImages (selectedAlbumName) {
//     const selectedAlbum = this.state.albums.filter((album) => album.albumName === selectedAlbumName).pop();

//     return selectedAlbum.images;
//   }

//   /**
//    * @description Render background color for the container
//    * @return {string}
//    */
//   renderBackgroundColor(){
//     return this.props.backgroundColor !== undefined ? this.props.backgroundColor : this.state.backgroundColor;
//   }

//   /**
//    * @description Render default loader style
//    * @return {{color: string, size: string}}
//    */
//   renderLoaderStyle(){
//     let props = this.props;
//     return {
//       color: props.activityIndicatorColor !== undefined ? props.activityIndicatorColor : this.state.activityIndicatorColor,
//       size: props.activityIndicatorSize !== undefined ? props.activityIndicatorSize : this.state.activityIndicatorSize
//     }
//   }

//   /**
//    * @description On list end reached , load more files if there are any
//    */
//   onEndReached() {
//     if (!this.state.noMoreFiles) {
//       this.getFiles();
//     }
//   }

//   renderMedia () {
//     if (!this.state.albumSelected) {
//       return (
//         <AlbumsList
//           albums={this.state.albums}
//           onAlbumPress={this.selectAlbum.bind(this)}/>
//       );
//     } else {
//       return (
//         <MediaList
//           images={this.getAlbumImages(this.state.albumSelected)}
//           itemsPerRow={this.props.itemsPerRow}
//           selected={this.props.selected}
//           onBackPress={this.deselectAlbum.bind(this)}
//           callback={this.props.callback}
//           batchSize={this.props.batchSize}
//           selectMediaFile={this.selectMediaFile}
//           imageMargin={this.props.imageMargin}
//           markIcon={this.props.markIcon}
//           customSelectMarker={this.props.customSelectMarker}
//           activityIndicatorColor={this.state.activityIndicatorColor}
//           maximumSelectedFiles={this.props.maximumSelectedFiles || this.state.maximumSelectedFiles}
//           />
//       );
//     }
//   }

//   render () {
//     return (
//       <View style={styles.base}>
//         {this.renderMedia()}
//       </View>
//     );
//   }
// }

export default GalleryMediaPicker;
