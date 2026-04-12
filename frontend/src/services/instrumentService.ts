import { api } from "../lib/api";
import type {
  Instrument,
  CreateInstrumentDto,
  UpdateInstrumentDto,
  Course,
  CourseLevel,
} from "../types";
import type { RawInstrumentData, RawCourseData } from "../types/api";

export const instrumentService = {
  async getAll(): Promise<Instrument[]> {
    console.log("instrumentService.getAll() - Début de la méthode");
    try {
      const response = await api.get<RawInstrumentData[]>("/instrument");
      console.log(
        "instrumentService.getAll() - Réponse API brute:",
        response.data,
      );

      const transformed = response.data.map((item) => {
        console.log(
          "instrumentService.getAll() - Transformation de l'item:",
          item,
        );
        return {
          id: item.instrument_id,
          name: item.name,
          description: item.description || undefined,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          courses:
            item.courses?.map((course: RawCourseData) => ({
              id: course.course_id,
              title: course.title,
              description: course.description,
              videoUrl: course.video_url || undefined,
              level: course.level as CourseLevel,
              instrumentId: item.instrument_id,
              createdAt: course.publication_date,
              updatedAt: course.publication_date,
            })) || [],
        };
      });

      console.log(
        "instrumentService.getAll() - Données transformées:",
        transformed,
      );
      return transformed;
    } catch (error) {
      console.error("instrumentService.getAll() - Erreur:", error);
      throw error;
    }
  },

  async getById(id: number): Promise<Instrument> {
    console.log("instrumentService.getById() - Début de la méthode");
    try {
      const response = await api.get<RawInstrumentData>(`/instrument/${id}`);
      console.log(
        "instrumentService.getById() - Réponse API brute:",
        response.data,
      );

      const item = response.data;
      console.log(
        "instrumentService.getById() - Transformation de l'item:",
        item,
      );
      return {
        id: item.instrument_id,
        name: item.name,
        description: item.description || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        courses:
          item.courses?.map((course: RawCourseData) => ({
            id: course.course_id,
            title: course.title,
            description: course.description,
            videoUrl: course.video_url || undefined,
            level: course.level as CourseLevel,
            instrumentId: item.instrument_id,
            createdAt: course.publication_date,
            updatedAt: course.publication_date,
          })) || [],
      };
    } catch (error) {
      console.error("instrumentService.getById() - Erreur:", error);
      throw error;
    }
  },

  async create(instrumentData: CreateInstrumentDto): Promise<Instrument> {
    const response = await api.post<Instrument>("/instrument", instrumentData);
    return response.data;
  },

  async update(
    id: number,
    instrumentData: UpdateInstrumentDto,
  ): Promise<Instrument> {
    const response = await api.patch<Instrument>(
      `/instrument/${id}`,
      instrumentData,
    );
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/instrument/${id}`);
  },

  async getCourses(instrumentId: number): Promise<Course[]> {
    const response = await api.get<Course[]>(
      `/course/instrument/${instrumentId}`,
    );
    return response.data;
  },
};
