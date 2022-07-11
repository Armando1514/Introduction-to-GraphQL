import { Context } from '../../index';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import { JSON_SIGNATURE } from '../../keys';

interface SignupArgs {
	credentials: {
		email: string;
		password: string;
	};
	name: string;
	bio: string;
}

interface SigninArgs {
	credentials: {
		email: string;
		password: string;
	};
}

interface UserPayload {
	userErrors: {
		message: String;
	}[];
	token: String | null;
}

export const authResolvers = {
	signup: async (
		_: any,
		{ credentials, name, bio }: SignupArgs,
		{ prisma }: Context
	): Promise<UserPayload> => {
		const { email, password } = credentials;

		const isUserExisting = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (isUserExisting) {
			return {
				userErrors: [
					{
						message: 'Email has already been used',
					},
				],
				token: null,
			};
		}

		const isEmail = validator.isEmail(email);

		let userErrors: { message: string }[] = [];
		if (!isEmail) {
			userErrors.push({
				message: 'Invalid email',
			});
		}

		const isValidPassword = validator.isLength(password, { min: 5 });
		if (!isValidPassword) {
			userErrors.push({
				message: 'Invalid password',
			});
		}

		if (!name) {
			userErrors.push({
				message: 'Invalid name',
			});
		}

		if (!bio) {
			userErrors.push({
				message: 'Invalid bio',
			});
		}

		if (userErrors.length > 0) {
			return {
				userErrors,
				token: null,
			};
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				email,
				name,
				password: hashedPassword,
			},
		});

		await prisma.profile.create({
			data: { bio, userId: user.id },
		});

		const token = await JWT.sign(
			{
				userId: user.id,
			},
			JSON_SIGNATURE,
			{
				expiresIn: 2424242,
			}
		);

		return {
			userErrors,
			token: token,
		};
	},
	signin: async (
		_: any,
		{ credentials }: SigninArgs,
		{ prisma }: Context
	): Promise<UserPayload> => {
		const { email, password } = credentials;
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			return {
				userErrors: [
					{
						message: 'User does not exist',
					},
				],
				token: null,
			};
		}

		const isMatch = bcrypt.compare(password, user.password);

		if (!isMatch) {
			return {
				userErrors: [
					{
						message: 'Invalid credentials',
					},
				],
				token: null,
			};
		}

		return {
			userErrors: [],
			token: JWT.sign({ userId: user.id }, JSON_SIGNATURE, {
				expiresIn: 2424242,
			}),
		};
	},
};
