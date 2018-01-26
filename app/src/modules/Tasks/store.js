import axios from 'axios';

export default {
  name: 'tasks',
  namespaced: true,
  state: {
    currPatientId: null,
    currPatientTasks: null,
    activityList: null,
    categoryList: null,
  },
  mutations: {
    setCurrPatientId(state, id) {
      if(id !== state.currPatientId){
        state.currPatientId = id;          
        state.currPatientTasks = null;
      }
    },
    addActivity(state, activity) {
      if (state.activityList === null)
        state.activityList = [];
      const catId = activity.category_id;
      const category = state.categoryList.find(cat => cat.id == catId);

      activity.category = category;
      state.activityList.push(activity);
    },
    addCategory(state, category) {
      if (state.categoryList === null)
        state.categoryList = [];
      state.categoryList.push(category);
    },
    addTask(state, task) {
      if (state.currPatientTasks === null)
        state.currPatientTasks = [];

      const actId = task.activity_id;
      const activity = state.activityList.find(act => act.id == actId);

      task.activity = activity;

      state.currPatientTasks.push(task);
    }
  },
  getters: {
    currPatient(state, getters, rootState, rootGetters) {
      let patient = state.currPatientId;

      if (patient) {
        patient = rootGetters['patients/list'].find(pat => pat.id == patient);
      }

      return patient;
    },
  },
  actions: {
    init({
      dispatch,
      state
    }) {
      dispatch('fetchCategories', () => {
        dispatch('fetchActivities', () => {});
      });
    },
    fetchActivities({
      rootGetters,
      commit
    }, callback) {
      let root = rootGetters['account/root'];
      let count = 0;

      function done() {
        count++;

        if (count == 2)
          callback();
      }
      axios.get(`/activity`, {
          params: {
            conditions: [`root:=${root}`]
          }
        })
        .then((response) => {
          response.data.forEach(activity => commit('addActivity', activity));
          done();
        });
      axios.get(`/activity`, {
          params: {
            conditions: [`root:=null`]
          }
        })
        .then((response) => {
          response.data.forEach(activity => commit('addActivity', activity));
          done();
        });
    },
    fetchCategories({
      rootGetters,
      commit
    }, callback) {
      let root = rootGetters['account/root'];
      let count = 0;

      function done() {
        count++;

        if (count == 2)
          callback();
      }

      axios.get(`/category`, {
          params: {
            conditions: [`root:=${root}`]
          }
        })
        .then((response) => {
          response.data.forEach(category => commit('addCategory', category));
          done();
        });
      axios.get(`/category`, {
          params: {
            conditions: [`root:=null`]
          }
        })
        .then((response) => {
          response.data.forEach(category => commit('addCategory', category));
          done();
        });
    },
    fetchTasks({
      rootGetters,
      state,
      commit
    }, callback) {

      let root = rootGetters['account/root'],
          id = state.currPatientId;
      
      state.currPatientTasks = [];
      axios.get(`/subject/${id}/tasks`)
        .then(response => {
          
          response.data.forEach(task => commit('addTask', task));

          if (callback)
            callback(response.data);
        })
    },
    clear({state}){
        state.currPatientId = null;
        state.currPatientTasks = null;
        state.activityList = null;
        state.categoryList = null;
    }
  }
}
