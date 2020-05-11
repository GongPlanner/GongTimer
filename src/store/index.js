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
    data: {},
    time: 0,
    timerState: 0
  },
  mutations: {
    setTime(state, time) {
      if (time <= 3600 && time >= 0) state.time = time;
      else state.timerState = 0;
    },
    decreaseTime(state) {
      if (state.time > 0) {
        --state.time;
      }
      if (state.time <= 0) state.timerState = 0;
    },
    setTimerState(state, timerState) {
      // 0 -> 초기 상태(멈춘 상태)
      // 1 -> 동작 상태(시간 흘러가는 상태)
      state.timerState = timerState;
      console.log(state.timerState);
    },
    ...vuexfireMutations
  },
  actions: {
    setTime: (context, time) => context.commit("setTime", time),
    decreaseTime: context => context.commit("decreaseTime"),
    setTimerState: (context, timerState) =>
      context.commit("setTimerState", timerState),
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
