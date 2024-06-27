import { StyleSheet } from "react-native";

export const food_styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
       
      },
   
      title: {
        fontSize: 20,
        fontWeight: "bold",
      },
      link: {
        marginTop: 20,
      }
})


export const food_details_screen = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    paddingTop: 30,
    paddingBottom: 30,
    textAlign: "center",
  },
  overview: {
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#dadada",
  },

  moreContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  moreButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrowIcon: {
    marginTop: 3,
  },
  moreInfoContainer: {
    marginTop: 20
  }
});
