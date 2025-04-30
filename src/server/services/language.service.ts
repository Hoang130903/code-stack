import type { PaginationQuery } from "@/validations/paginationQuerySchema";
import type { PrismaClient, Prisma } from "@primsa-client/generated";

import type {
	CreateLanguageDTO,
	UpdateLanguageDTO,
} from "@/validations/languages";

export class LanguageService {
	constructor(private prisma: PrismaClient) {}

	async findAll(params: PaginationQuery & { search?: string }) {
		const whereClause: Prisma.LanguageWhereInput = params.search
			? {
					languageName: {
						contains: params.search,
						mode: "insensitive",
					},
				}
			: {};

		const orderField = params.orderBy || "languageName";
		const orderDirection = params.order || "asc";

		const [data, total] = await Promise.all([
			this.prisma.language.findMany({
				where: whereClause,
				orderBy: {
					[orderField]: orderDirection,
				},
				take: params.pageSize,
				skip: (params.page - 1) * params.pageSize,
			}),
			this.prisma.language.count({
				where: whereClause,
			}),
		]);

		return { data, total };
	}

	async findById(id: number) {
		return this.prisma.language.findUnique({
			where: { languageId: id },
		});
	}

	async findByName(name: string) {
		return this.prisma.language.findUnique({
			where: { languageName: name },
		});
	}

	async create(data: CreateLanguageDTO) {
		return this.prisma.language.create({ data });
	}

	async update(id: number, data: UpdateLanguageDTO) {
		await this.findByIdOrThrow(id);
		return this.prisma.language.update({
			where: { languageId: id },
			data,
		});
	}

	async delete(id: number) {
		await this.findByIdOrThrow(id);
		return this.prisma.language.delete({
			where: { languageId: id },
		});
	}

	async toggleActive(id: number) {
		const lang = await this.findByIdOrThrow(id);
		return this.setActive(id, !lang.isActive);
	}

	async setActive(id: number, isActive: boolean) {
		return this.prisma.language.update({
			where: { languageId: id },
			data: { isActive },
		});
	}

	private async findByIdOrThrow(id: number) {
		const lang = await this.findById(id);
		if (!lang) throw new Error(`Language ${id} not found`);
		return lang;
	}
}

export type LanguageListResponse = Awaited<
	ReturnType<LanguageService["findAll"]>
>;
export type LanguageItemResponse = Awaited<
	ReturnType<LanguageService["findById"]>
>;
