import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Modal,
  StyleSheet,
} from "react-native";
import { Card, Icon } from "@rneui/themed";
import { colorGaztaroaOscuro } from "../comun/comun";
import { connect } from "react-redux";
import { postComentario, postFavorito } from "../redux/ActionCreators";
import { Button, Input, Rating } from "react-native-elements";

const mapStateToProps = (state) => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    favoritos: state.favoritos,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
  postComentario: (excursionId, valoracion, autor, comentario, dia) =>
    dispatch(postComentario(excursionId, valoracion, autor, comentario, dia)),
});

function RenderExcursion(props) {
  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card>
        <Card.Divider />
        <Card.Image source={{ uri: excursion.imagen }}>
          <Card.Title style={{ color: "lightgray", fontSize: 30 }}>
            {excursion.nombre}
          </Card.Title>
        </Card.Image>
        <Text style={{ margin: 20 }}>{excursion.descripcion}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            raised
            reverse
            name={props.favorita ? "heart" : "heart-o"}
            type="font-awesome"
            color="#f50"
            onPress={() =>
              props.favorita
                ? console.log(
                    "La excursión ya se encuentra entre las favoritas"
                  )
                : props.onPress()
            }
          />
          <Icon
            raised
            reverse
            name={"pencil"}
            type="font-awesome"
            color={colorGaztaroaOscuro}
            onPress={() => props.toggleModal()}
          />
        </View>
      </Card>
    );
  } else {
    return <View></View>;
  }
}

function RenderComentario(props) {
  const comentarios = props.comentarios;
  const renderComentarioItem = ({ item, index }) => {
    let fecha = new Date(item.dia.replace(/\s/g, ""));
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comentario}</Text>
        <Text style={{ fontSize: 12 }}>{`-- ${
          item.autor
        }, ${fecha.toLocaleString()}`}</Text>
        <Text style={{ fontSize: 12 }}>{item.valoracion} Stars</Text>
      </View>
    );
  };
  return (
    <Card>
      <Card.Title>Comentarios</Card.Title>
      <Card.Divider />
      <FlatList
        scrollEnabled={false}
        data={comentarios}
        renderItem={renderComentarioItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </Card>
  );
}

class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valoracion: 5,
      autor: "",
      comentario: "",
      showModal: false,
    };
    this.resetForm = this.resetForm.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.gestionarComentario = this.gestionarComentario.bind(this);
  }

  marcarFavorito(excursionId) {
    this.props.postFavorito(excursionId);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  resetForm() {
    this.setState({
      valoracion: 5,
      autor: "",
      comentario: "",
      showModal: false,
    });
  }

  gestionarComentario() {
    const { excursionId } = this.props.route.params;
    const { valoracion, autor, comentario } = this.state;
    const dia = new Date().toISOString();
    this.props.postComentario(excursionId, valoracion, autor, comentario, dia);
    this.resetForm();
  }

  render() {
    const { excursionId } = this.props.route.params;
    return (
      <ScrollView>
        <RenderExcursion
          excursion={this.props.excursiones.excursiones[+excursionId]}
          favorita={this.props.favoritos.favoritos.some(
            (el) => el === excursionId
          )}
          onPress={() => this.marcarFavorito(excursionId)}
          toggleModal={() => this.toggleModal()}
        />
        <RenderComentario
          comentarios={this.props.comentarios.comentarios.filter(
            (comentario) => comentario.excursionId === excursionId
          )}
        />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            <Rating
              showRating
              startingValue={this.state.valoracion}
              imageSize={40}
              onFinishRating={(rating) => this.setState({ valoracion: rating })}
              style={{ paddingVertical: 10 }}
            />
            <Input
              placeholder="Autor"
              leftIcon={{ type: "font-awesome", name: "user" }}
              onChangeText={(value) => this.setState({ autor: value })}
              value={this.state.autor}
            />
            <Input
              placeholder="Comentario"
              leftIcon={{ type: "font-awesome", name: "comment" }}
              onChangeText={(value) => this.setState({ comentario: value })}
              value={this.state.comentario}
            />
            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.gestionarComentario();
                  this.toggleModal();
                }}
                color={colorGaztaroaOscuro}
                title="Enviar"
              />
            </View>
            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.toggleModal();
                  this.resetForm();
                }}
                color="grey"
                title="Cancelar"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    margin: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);
