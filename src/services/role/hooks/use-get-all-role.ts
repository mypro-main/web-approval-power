import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { UseQueryReturn } from '../../shared/use-query-return-type';
import { BaseMeta } from '../../shared/base.response';
import { RoleResponse } from '../role.response';
import { RoleService } from '../role-service';
import { GetAllRoleParams } from '../role.request';

interface UseGetAllRoleReturn extends UseQueryReturn {
  roles: RoleResponse[];
  meta?: BaseMeta;
}

export function useGetAllRole(params?: GetAllRoleParams): UseGetAllRoleReturn {
  const api = new RoleService();

  const { data, error, isPending, isFetching, isLoading } = useQuery({
    queryKey: ['roles', params?.page, params?.perPage, params?.name, params?.status],
    queryFn: () => api.getAll(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  return useMemo(
    () => ({
      roles: data?.data || [],
      meta: data?.meta,
      error,
      isFetching: isLoading || isFetching || isPending,
    }),
    [data, error, isPending, isLoading, isFetching]
  );
}
