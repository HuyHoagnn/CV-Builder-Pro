
import { createClient } from '@supabase/supabase-js';

// Thông tin kết nối Supabase thực tế được cung cấp
const supabaseUrl = 'https://azkokgkbxkagzjgxyhdz.supabase.co';
const supabaseAnonKey = 'sb_publishable__um_DNjPrMWcV8Qt5DVFFQ_1XlfU4HH';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const db = {
  profiles: {
    get: async (userId: string) => {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
      return { data, error };
    },
    listAll: async () => {
      const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      return { data, error };
    },
    upsert: async (profile: any) => {
      const { data, error } = await supabase.from('profiles').upsert(profile);
      return { data, error };
    }
  },
  cvs: {
    list: async (userId: string) => {
      const { data, error } = await supabase.from('cvs').select('*').eq('user_id', userId).order('updated_at', { ascending: false });
      return { data, error };
    },
    listAll: async () => {
      const { data, error } = await supabase.from('cvs').select('*').order('updated_at', { ascending: false });
      return { data, error };
    },
    upsert: async (cv: any) => {
      const { data, error } = await supabase.from('cvs').upsert(cv);
      return { data, error };
    },
    delete: async (id: string) => {
      const { error } = await supabase.from('cvs').delete().eq('id', id);
      return { error };
    }
  },
  templates: {
    list: async () => {
      const { data, error } = await supabase.from('templates').select('*');
      return { data, error };
    },
    upsert: async (template: any) => {
      const { data, error } = await supabase.from('templates').upsert(template);
      return { data, error };
    },
    delete: async (id: string) => {
      const { error } = await supabase.from('templates').delete().eq('id', id);
      return { error };
    }
  }
};
