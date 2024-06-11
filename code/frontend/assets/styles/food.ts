import { StyleSheet } from "react-native";

export const food_styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
       
      },
      nutrients : {
        flexDirection: "row",
        paddingBottom: 20
      },
      title: {
        fontSize: 20,
        fontWeight: "bold",
      },
      link: {
        marginTop: 20,
      }
})


export const food_search_styles = StyleSheet.create({
  foodResultContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#dadada",
    padding: 10,
  },
  foodResultTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  bottomTextContainer: {
    flexDirection: "row",
  },
  topText: {
    fontWeight: "bold",
    paddingBottom: 5,
    fontSize: 16,
  },
  bottomText: {
    fontSize: 14,
  },
  absoluteFillObject: {
    width:400,
    height:400
  }
});

export const food_details_styles = StyleSheet.create({
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
  overviewText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 90,
  },
  macronutrientsContainer: {
    flexDirection: "row",
  },
  text_medium: {
    fontSize: 18,
  },
  text_small: {
    fontSize: 16,
  },
  quantityContainer: {
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#dadada",
    flexDirection: "row",
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
