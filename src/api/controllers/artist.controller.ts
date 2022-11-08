import { IErrorResponse } from "../../application/dto/IErrorResponse";
import { ErrorResponse } from "../../application/errorType/ErrorResponse";
import { LoadArtistsUseCase } from "../../application/useCases/loadArtistsUseCase";
import { Request, Response } from "express";

export const getArtists = async (req: Request, res: Response) => {
  const useCase = new LoadArtistsUseCase();
  const { artistName, fileName } = req.params;
  if (!artistName?.length || !fileName?.length) {
    const error: IErrorResponse = {
      code: 422,
      message: "Artist Name and File Name are required parameters !",
    };
    res.status(error.code).json(error);
  }
  const result = await useCase.execute(artistName, fileName);
  if (result instanceof ErrorResponse) {
    res.status(result.getCode()).json(result);
  }
  res.status(200).json(result);
};
