import {create} from 'zustand';

interface StudyPlanUiStore
{
    searchText : string;
    setSearchText : (text : string) => void;
    clearSearch : () => void;
}

export const useStudyPlanUiStore =
    create<StudyPlanUiStore>()((set) => ({
        //搜尋文字預設空的
        searchText : "",
        setSearchText : (text) => {
            set({searchText : text });
        },
        clearSearch : () => {
            set({ searchText : ""});
        },
    }));