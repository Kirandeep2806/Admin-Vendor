import React, { useState, useEffect } from 'react';
import { Alert, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../../../config/firebase'
import {
  Appbar,
  Button,
  TextInput,
} from 'react-native-paper'
import { AuthContext } from '../../../auth/authContext'
// import { sendNotifcation } from '../../../utils'
import { BOTTOM_TAB_COLORS, ADMIN_VENDOR_SUB_COLLECT, VENDOR_SUB_COLLECT, ROOT_COLLECT_NAME } from '../../../constants'

const db = firebase.firestore();

export default ({ navigation, route }) => {

  const { userData } = React.useContext(AuthContext)
  const { data, productData } = route?.params;

  const [image, setImage] = useState(data.url)
  const [imageName, setImageName] = useState(null)
  const [titleForImage, setTitleForImage] = useState(data.title)
  const [descriptionForImage, setDescriptionForImage] = useState(data.description)
  const [price, setPrice] = useState(data.price)
  const [deleteDone, setDeleteDone] = useState(false)

  const [pickImageDone, setPickImageDone] = React.useState(false)

  const [publishBegin, setPublishBegin] = React.useState(false)
  const [publishDone, setPublishDone] = React.useState(false)
  const [publishErr, setPublishErr] = React.useState(false)

  useEffect(() => {
    ImagePicker.requestCameraRollPermissionsAsync().then(({ status }) => {
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }).catch((e) => {
      console.log("Error camera : ", e)
    });
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPickImageDone(true)
      setImage(result.uri);
      let file_name = result.uri.split("/").pop()
      setImageName(file_name.split(".")[0])
    }
  };

  const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri)
    const blob = await response.blob()
    const storageRef = firebase.storage().ref().child("VendorProducts/" + userData.email + "/" + titleForImage)
    return storageRef.put(blob)
  }

  const onClickUpload = () => {
    setPublishBegin(true)
    uploadImage(image, imageName).then(() => {
      console.log("Image inserted successfully with name " + titleForImage)
      Alert.alert("Success", "Updated successfully...!")

      const docRef2 = db.collection(ROOT_COLLECT_NAME).doc(userData.email).collection(VENDOR_SUB_COLLECT).doc(productData.key);

      const storageRef = firebase.storage().ref().child("VendorProducts/" + userData.email + "/" + titleForImage)
      storageRef.getDownloadURL().then((url) => {
        docRef2.set({
          title: titleForImage,
          description: descriptionForImage,
          price: price,
          url: url,
          email: userData.email,
          phone_no: userData.phone,
          name: userData.name,
          publisherMail: data.publisherMail,
        }).then(() => {
          console.log("Inserted successfully - 1")
        }).catch(e => {
          console.log("Encountered error - 1 : ", e)
        })
      }).then(() => {
        console.log("Pushed successfully")
        setPublishBegin(false)
        setPublishDone(true)
      }).catch(e => {
        console.log("Error occured : ", e)
      });

    }).catch(error => {
      console.log("Error occured", error)
      Alert.alert("Alert", "Failed to upload Image")
    })
  }

  const onDeleteClick = () => {
    firebase.storage().ref().child("VendorProducts/" + userData.email + "/" + titleForImage).delete()
      .then(() => console.log("Image Deleted successfully...!"))
      .catch(() => console.log("Error occured while deleting the image from firestorage"))

    db.collection(ROOT_COLLECT_NAME).doc(userData.email).collection(VENDOR_SUB_COLLECT).doc(productData.key).delete().then(() => {
      console.log("Deleted document")
    }).catch((e) => {
      console.log("Error occured while deleting document... ", e)
    })

    db.collection(ROOT_COLLECT_NAME).doc(data.publisherMail).collection(ADMIN_VENDOR_SUB_COLLECT).doc(productData.key).update({
      vendorEmail: firebase.firestore.FieldValue.arrayRemove(userData.email)
    }).then(() => {
      setDeleteDone(true)
      console.log("Products Details has been deleted successfully...!")
      Alert.alert("Success", "Product is deleted successfully...!")
      navigation.navigate("home")
    }).catch((e) => console.log("Error occured while deleting the array value", e))
  }

  return (
    <>
      <Appbar.Header style={{ backgroundColor: BOTTOM_TAB_COLORS[4] }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Update Product" />
      </Appbar.Header>
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.textInput}
          label="Title"
          placeholder="Enter the title"
          value={titleForImage}
          onChangeText={text => setTitleForImage(text)}
        />
        <TextInput
          style={styles.textInput}
          label="Description"
          placeholder="Enter the description"
          value={descriptionForImage}
          onChangeText={text => setDescriptionForImage(text)}
          multiline={true}
        />
        <TextInput
          style={styles.textInput}
          label="Price"
          placeholder="Enter the Price"
          value={price}
          onChangeText={text => setPrice(text)}
        />
        <Button
          onPress={pickImage}
          icon='camera-plus-outline'
          mode={pickImageDone ? 'contained' : 'outlined'}
          color={
            pickImageDone ? BOTTOM_TAB_COLORS[4] : BOTTOM_TAB_COLORS[3]
          }
          style={styles.textInput}
        >
          {pickImageDone
            ? 'Selected Image'
            : 'Select Image'}
        </Button>

        <Button
          onPress={onClickUpload}
          icon={
            publishDone
              ? 'cloud-check'
              : publishErr
                ? 'cloud-alert'
                : 'cloud-upload'
          }
          loading={publishBegin}
          mode={publishDone || publishErr ? 'contained' : 'outlined'}
          color={
            publishDone ? BOTTOM_TAB_COLORS[4] : BOTTOM_TAB_COLORS[3]
          }
          style={styles.textInput}
        >
          {publishBegin
            ? 'Uploading...'
            : publishDone
              ? 'Uploaded'
              : publishErr
                ? 'Published Fail, try later'
                : 'Upload'}
        </Button>

        <Button
          onPress={onDeleteClick}
          icon='trash-can-outline'
          mode={deleteDone ? 'contained' : 'outlined'}
          color={BOTTOM_TAB_COLORS[3]}
          loading={deleteDone}
          style={styles.textInput}
        >
          {deleteDone
            ? 'Deleted Image'
            : 'Delete Image'}
        </Button>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20
  },
  textInput: {
    marginVertical: 10,
  }
})