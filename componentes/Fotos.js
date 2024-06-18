import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Button,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { app } from "../comun/firebaseInit";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { auth } from "../comun/firebaseInit";

const { width } = Dimensions.get("window");
const imageWidth = width - 40;

const Fotos = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imagesFromStorage, setImagesFromStorage] = useState([]);

  useEffect(() => {
    fetchImagesFromStorage();
  }, []);

  const fetchImagesFromStorage = async () => {
    const storage = getStorage(app);
    const imagesRef = ref(storage, "images/");

    try {
      const imageList = await listAll(imagesRef);
      const urls = await Promise.all(
        imageList.items.map(async (item) => {
          return getDownloadURL(item);
        })
      );
      setImagesFromStorage(urls);
    } catch (error) {
      console.error("Error fetching images: ", error);
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.assets[0].uri);
      }
    } catch (E) {
      console.log(E);
    }
  };

  const storage = getStorage(app);

  const getBlobFromUri = async (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  };

  const uploadImage = async () => {
    if (!image) return;

    try {
      setUploading(true);

      const blob = await getBlobFromUri(image);

      const metadata = {
        contentType: "image/jpeg",
      };

      const storageRef = ref(
        storage,
        "images/" + Date.now() + "_" + auth.currentUser.email.split("@")[0]
      );
      const snapshot = await uploadBytes(storageRef, blob, metadata);

      console.log(
        "File uploaded successfully by the user: " + auth.currentUser.email,
        snapshot
      );

      fetchImagesFromStorage();
      setImage(null);
      setUploading(false);
    } catch (error) {
      console.error("Error uploading image: ", error);
      setUploading(false);
    }
  };

  const renderImageItem = ({ item }) => (
    <Image
      source={{ uri: item }}
      style={[styles.image, { marginBottom: 10 }]}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Seleccionar imagen de la galería para que la vean todos los usuarios"
          onPress={pickImage}
        />
        {image && (
          <View style={styles.previewContainer}>
            <Image source={{ uri: image }} style={styles.previewImage} />
            <Button title="Subir imagen" onPress={uploadImage} />
          </View>
        )}
        {uploading && <ActivityIndicator size="large" color="#0000ff" />}
      </View>
      <View style={styles.cardContainer}>
        <FlatList
          data={imagesFromStorage}
          renderItem={renderImageItem}
          keyExtractor={(index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  previewContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  previewImage: {
    width: imageWidth,
    height: imageWidth * 0.75,
    resizeMode: "cover",
  },
  cardContainer: {
    flex: 1,
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  image: {
    width: imageWidth,
    height: imageWidth * 0.75,
    resizeMode: "cover",
  },
});

export default Fotos;
