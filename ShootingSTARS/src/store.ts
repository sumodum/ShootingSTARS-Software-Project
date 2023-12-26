import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import AllModulesReducer from './Reducers/AllModulesReducer';
import currentPlanReducer from './Reducers/CurrentPlanReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import UserReducer from './Reducers/UserReducer';
const persistConfig = {
  key: 'root',
  storage,
};

const userPersistConfig = { 
  key: 'user',
  storage,
};

const persistedReducer = persistReducer(persistConfig, currentPlanReducer);
const userPersistedReducer = persistReducer(userPersistConfig,UserReducer);

export const store = configureStore({
  reducer: {
    currentPlan: persistedReducer,
    allModules: AllModulesReducer,
    user: userPersistedReducer,
  },
  middleware:[thunk]});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType, 
  RootState,
  unknown,
  Action<string>
>;

