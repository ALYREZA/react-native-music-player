'use strict';
import React, {
  AppRegistry,
  Component,
  Dimensions,
  StyleSheet,
  Image,
  Text,
  View,
  ListView
} from 'react-native';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

const window = Dimensions.get('window');
const PARALLAX_HEADER_HEIGHT = 280;
const STICKY_HEADER_HEIGHT = 50;
const AVATAR_SIZE = 120;

class ArtistShow extends Component {


  renderStickyHeader() {
    return(
      <View style={ styles.stickySection }>
        <Text style={ styles.stickySectionTitle }>{ this.props.artist.name }</Text>
      </View>
    );
  }

  renderForeground() {
    return(
      <View key="parallax-header" style={ styles.parallaxHeader }>
        <Image style={ styles.avatar } source={{
          uri:  this.props.artist.background,
          width: AVATAR_SIZE,
          height: AVATAR_SIZE
        }}/>
        <Text style={ styles.artistName }>
          { this.props.artist.name }
        </Text>
        <View style={ styles.playButton }>
          <Text style={ styles.playButtonText }>
            PLAY
          </Text>
        </View>
      </View>
    );
  }

  renderBackground() {
    return(
      <View key="background" style={ styles.background }>
        <Image source={{uri: this.props.artist.background,
                        width: window.width,
                        height: PARALLAX_HEADER_HEIGHT}}/>
        <View style={ styles.backgroundOverlay }/>
      </View>
    );
  }

  renderSongsList() {
    let songsDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows( this.props.artist.songs );
    return(
      <ListView
        dataSource={ songsDataSource }
        style={ styles.songsList }
        renderRow={(song) => (
          <View key={song} style={ styles.song }>
            <Text style={ styles.songTitle }>
              { song.title }
            </Text>
            <Text style={ styles.albumTitle }>
              { song.album }
            </Text>
          </View>
          )}/>
    );
  }

  render() {
    const { onScroll = () => {} } = this.props;
    return (
      <ParallaxScrollView
        parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
        stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
        onScroll={onScroll}
        renderStickyHeader={ this.renderStickyHeader.bind(this) }
        renderForeground={ this.renderForeground.bind(this) }
        renderBackground={ this.renderBackground.bind(this) }>
        { this.renderSongsList() }
      </ParallaxScrollView>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#000",
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    width: window.width,
    backgroundColor: 'rgba(0,0,0,.8)',
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    backgroundColor: '#000',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stickySectionTitle: {
    color: "#FFF",
  },
  parallaxHeader: {
    alignItems: 'center',
    paddingTop: 40,
    width: window.width,
  },
  artistName: {
    fontSize: 23,
    color: "#FFF",
    fontFamily: "Helvetica Neue",
  },
  avatar: {
    marginBottom: 12,
    borderRadius: AVATAR_SIZE / 2
  },
  playButton: {
    marginTop: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 70,
    paddingRight: 70,
    backgroundColor: "#f62976",
    borderRadius: 200,
  },
  playButtonText: {
    color: "#FFF",
    fontFamily: "Helvetica Neue",
    fontSize: 13,
  },
  songsList: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 5,
    height: window.height - STICKY_HEADER_HEIGHT,
  },
  song: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#111",

  },
  songTitle: {
    color: "white",
    fontFamily: "Helvetica Neue",
    marginBottom: 5,
  },
  albumTitle: {
    color: "#BBB",
    fontFamily: "Helvetica Neue",
    fontSize: 12
  },

});

module.exports = ArtistShow;
