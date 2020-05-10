import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations, firestoreAction, firestoreOptions } from "vuexfire";
import firebase from "./firebase";
import dayjs from "dayjs";

Vue.use(Vuex);

firestoreOptions.wait = true;
const db = firebase.firestore();

export default new Vuex.Store({
  state: {
    data: {}
  },
  mutations: vuexfireMutations,
  actions: {
    bindRef: firestoreAction((context, payload) => {
      context.bindFirestoreRef(payload.name, payload.ref, payload.options);
    }),
    init: firestoreAction(context => {
      context.bindFirestoreRef(
        "data",
        db.collection("testSubject").doc(dayjs().format("YY.MM.DD"))
      );
    })
  },
  modules: {}
});
