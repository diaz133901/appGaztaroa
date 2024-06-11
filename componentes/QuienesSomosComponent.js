import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { Card, ListItem, Avatar } from "@rneui/themed";
import { ScrollView } from "react-native-virtualized-view";
import { connect } from "react-redux";
import { IndicadorActividad } from "./IndicadorActividadComponent";

const mapStateToProps = (state) => {
  return {
    actividades: state.actividades,
  };
};

const Historia = () => {
  return (
    <Card>
      <Card.Title>Un poquito de historia</Card.Title>
      <Card.Divider />
      <View style={{ margin: 10 }}>
        <Text>
          El nacimiento del club de montaña Gaztaroa se remonta a la primavera
          de 1976 cuando jóvenes aficionados a la montaña y pertenecientes a un
          club juvenil decidieron crear la sección montañera de dicho club.
          Fueron unos comienzos duros debido sobre todo a la situación política
          de entonces. Gracias al esfuerzo económico de sus socios y socias se
          logró alquilar una bajera. Gaztaroa ya tenía su sede social. Desde
          aquí queremos hacer llegar nuestro agradecimiento a todos los
          montañeros y montañeras que alguna vez habéis pasado por el club
          aportando vuestro granito de arena. ¡Gracias!
        </Text>
      </View>
    </Card>
  );
};

class QuienesSomos extends Component {
  renderActividadItem = ({ item }) => {
    return (
      <ListItem bottomDivider>
        <Avatar source={{ uri: item.imagen }} />
        <ListItem.Content>
          <ListItem.Title>{item.nombre}</ListItem.Title>
          <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  render() {
    if (this.props.actividades.isLoading) {
      return (
        <ScrollView>
          <Historia />
          <Card>
            <Card.Title>"Actividades y recursos"</Card.Title>
            <Card.Divider />
            <IndicadorActividad />
          </Card>
        </ScrollView>
      );
    } else if (this.props.actividades.errMess) {
      return (
        <ScrollView>
          <Historia />
          <Card>
            <Card.Title>"Actividades y recursos"</Card.Title>
            <Card.Divider />
          </Card>
          <View>
            <Text>{this.props.excursiones.errMess}</Text>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView>
          <Historia />
          <View style={{ marginBottom: 10 }}>
            <Card>
              <Card.Title>Actividades y recursos</Card.Title>
              <Card.Divider />
              <FlatList
                data={this.props.actividades.actividades}
                renderItem={this.renderActividadItem}
                keyExtractor={(item) => item.id.toString()}
              />
            </Card>
          </View>
        </ScrollView>
      );
    }
  }
}

export default connect(mapStateToProps)(QuienesSomos);
