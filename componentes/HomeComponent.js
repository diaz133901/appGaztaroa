import React, { Component } from "react";
import { Text, ScrollView, View } from "react-native";
import { Card } from "@rneui/themed";
import { connect } from "react-redux";
import { IndicadorActividad } from "./IndicadorActividadComponent";

const mapStateToProps = (state) => {
  return {
    actividades: state.actividades,
    excursiones: state.excursiones,
    cabeceras: state.cabeceras,
  };
};

function RenderItem(props) {
  const item = props.item;

  if (props.isLoading) {
    return <IndicadorActividad />;
  } else if (props.errMess) {
    return (
      <View>
        <Text>{props.errMess}</Text>
      </View>
    );
  } else {
    if (item != null) {
      return (
        <Card>
          <Card.Divider />
          <Card.Image source={{ uri: item.imagen }}>
            <Text style={styles.title}>{item.nombre}</Text>
          </Card.Image>
          <Text style={{ margin: 20 }}>{item.descripcion}</Text>
        </Card>
      );
    } else {
      return <View></View>;
    }
  }
}

class Home extends Component {
  render() {
    return (
      <ScrollView>
        <RenderItem
          item={
            this.props.cabeceras.cabeceras.filter(
              (cabecera) => cabecera.destacado
            )[0]
          }
          isLoading={this.props.cabeceras.isLoading}
          errMess={this.props.cabeceras.errMess}
        />
        <RenderItem
          item={
            this.props.excursiones.excursiones.filter(
              (excursion) => excursion.destacado
            )[0]
          }
          isLoading={this.props.excursiones.isLoading}
          errMess={this.props.excursiones.errMess}
        />
        <RenderItem
          item={
            this.props.actividades.actividades.filter(
              (actividad) => actividad.destacado
            )[0]
          }
          isLoading={this.props.actividades.isLoading}
          errMess={this.props.actividades.errMess}
        />
      </ScrollView>
    );
  }
}

const styles = {
  title: {
    position: "relative",
    textAlign: "center",
    color: "chocolate",
    fontSize: 30,
    fontWeight: "bold",
  },
};
export default connect(mapStateToProps)(Home);
