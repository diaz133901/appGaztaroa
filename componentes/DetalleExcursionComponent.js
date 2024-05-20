import React, { Component } from "react";
import { Card, Icon } from "@rneui/themed";
import { Text, View, FlatList } from "react-native";
import { connect } from "react-redux";
import { ScrollView } from "react-native-virtualized-view";
import { baseUrl } from "../comun/comun";
import { postFavorito } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    favoritos: state.favoritos,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
});

function RenderExcursion(props) {
  const excursion = props.excursion;
  if (excursion != null) {
    return (
      <Card>
        <Card.Divider />
        <Card.Image source={{ uri: baseUrl + excursion.imagen }}>
          <Text style={styles.title}>{excursion.nombre}</Text>
        </Card.Image>
        <Text style={{ margin: 20 }}>{excursion.descripcion}</Text>
        <Icon
          raised
          reverse
          name={props.favorita ? "heart" : "heart-o"}
          type="font-awesome"
          color="#f50"
          onPress={() =>
            props.favorita
              ? console.log("La excursión ya se encuentra entre las favoritas")
              : props.onPress()
          }
        />
      </Card>
    );
  } else {
    return <View></View>;
  }
}

function RenderComentario(props) {
  const comentarios = props.comentarios;

  const renderComentarioItem = ({ item }) => {
    return (
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 14, marginBottom: 5 }}>{item.comentario}</Text>
        <Text style={{ fontSize: 12, color: "gray" }}>{item.autor}</Text>
        <Text style={{ fontSize: 12, color: "gray" }}>{item.dia}</Text>
      </View>
    );
  };

  return (
    <Card>
      <Card.Title>Comentarios</Card.Title>
      <Card.Divider />
      <FlatList
        data={comentarios}
        renderItem={renderComentarioItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </Card>
  );
}

class DetalleExcursion extends Component {
  marcarFavorito(excursionId) {
    this.props.postFavorito(excursionId);
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
        />
        <RenderComentario
          comentarios={this.props.comentarios.comentarios.filter(
            (comentario) => comentario.excursionId === excursionId
          )}
        />
      </ScrollView>
    );
  }
}

const styles = {
  title: {
    position: "relative",
    textAlign: "center",
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);
