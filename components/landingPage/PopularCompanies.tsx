"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ErrorBox } from "@/components/ui/ErrorBox";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Skeleton } from "@/components/ui/Skeleton";
import { useApi } from "@/hooks/useApi";
import type { Company } from "@/lib/data";
import { CompanyCard } from "./CompanyCard";

export function PopularCompanies() {
  const { payload, loading, error, reload } = useApi<{ data: Company[] }>("/api?section=companies");

  return (
    <section className="pt-[88px]">
      <Container>
        <SectionTitle>Perusahaan Populer</SectionTitle>
        <div className="mt-8">
          {loading && !payload && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-busy="true">
              {Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} className="h-[320px]" />)}
            </div>
          )}
          {error && <ErrorBox message={error} onRetry={reload} />}
          {!error && payload && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {payload.data.map((c) => <CompanyCard key={c.id} company={c} />)}
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-center">
          <PrimaryButton>Lihat perusahaan lainnya <ArrowRight className="size-4" /></PrimaryButton>
        </div>
      </Container>
    </section>
  );
}
