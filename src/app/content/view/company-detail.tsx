import React from "react";
import { Descriptions, Breadcrumb, Badge, Space, Tag } from "antd";
import type { DescriptionsProps } from "antd";
import { useParams } from "react-router-dom";
import { APP_DOMAIN } from "../../../config";
import { http } from "../../../api/state/http";

export interface IOverview {
  object: string;
  id: string;
  overview: {
    name: string;
    legal_name: string;
    names: string[];
    url: string;
    logo: {
      med?: string;
      lrg?: string;
    };
    initials: string;
    countrycode: string;
    sector: string;
    type: string;
    status: string;
    created: string;
    description: string;
    abn: string;
    acn: string;
    nzbn: string;
    staff: {
      min?: number;
      med?: number;
      max?: number;
    };
    location: {
      street: string;
      suburb: string;
      postcode: string;
      state: string;
      country: string;
      countrycode: string;
      lga: string;
      latitude: number;
      longitude: number;
    };
    contact: {
      website: string;
      email: string;
      phone: string;
    };
    industry: string;
    gics?: {
      code: number;
      label: string[];
    };
    anzsic?: {
      code: number;
      label: string[];
    };
    tags: string[];
    views: {
      ads: {
        active: boolean;
      };
      organic: {
        active: boolean;
      };
      domains: {
        active: boolean;
        total: number;
      };
      tech_stack: {
        active: boolean;
      };
      customer_reviews: {
        active: boolean;
      };
      employee_reviews: {
        active: boolean;
      };
      awards: {
        active: boolean;
        total: number;
      };
      socials: {
        active: boolean;
        total: number;
      };
      news: {
        active: boolean;
      };
      people: {
        active: boolean;
        total: number;
      };
      jobs: {
        active: boolean;
        total: number;
      };
      finance: {
        active: boolean;
      };
      contracts: {
        active: boolean;
        total: number;
      };
      salaries: {
        active: boolean;
        total: number;
      };
      locations: {
        active: boolean;
        total: number;
      };
      trademarks: {
        active: boolean;
        total: number;
      };
    };
  };
}

const item = {
  object: "business",
  id: "9ptrc95sh",
  overview: {
    name: "AARON SANSONI GROUP INTERNATIONAL",
    legal_name: "AARON SANSONI GROUP INTERNATIONAL PTY LTD",
    names: ["AARON SANSONI GROUP INTERNATIONAL"],
    url: "https://app.knowfirst.ai/business/aaron-sansoni-group-international-9ptrc95sh/profile/overview",
    logo: {
      med: "https://cdn.knowfirst.ai/image/bf0e1bb6a89ab979390c3f561cc6448d/140x140.png",
      lrg: "https://cdn.knowfirst.ai/image/bf0e1bb6a89ab979390c3f561cc6448d/450x450.png",
    },
    initials: "ASG",
    countrycode: "au",
    sector: "private",
    type: "Private Company",
    status: "active",
    created: "2003",
    description: "Investor, Empire Builder, Philanthropist & Best-Selling Author",
    abn: "55642332821",
    acn: "642332821",
    nzbn: null,
    staff: {
      min: 17,
      med: 34,
      max: 50,
    },
    location: {
      street: "84/88 Montague St",
      suburb: "South Melbourne",
      postcode: "3205",
      state: "VIC",
      country: "Australia",
      countrycode: "au",
      lga: "Port Phillip",
      latitude: -37.830188,
      longitude: 144.949252,
    },
    contact: {
      website: "aaronsansoni.com",
      email: "support@aaronsansoni.com",
      phone: "(03) 9088 6250",
    },
    industry: "Education Services",
    gics: {
      code: 25302010,
      label: ["Consumer Discretionary", "Consumer Services", "Diversified Consumer Services", "Education Services"],
    },
    anzsic: {
      code: null,
      label: null,
    },
    tags: ["corporate office", "consultant", "clothing store"],
    views: {
      ads: {
        active: false,
      },
      organic: {
        active: true,
      },
      domains: {
        active: true,
        total: 14,
      },
      tech_stack: {
        active: true,
      },
      customer_reviews: {
        active: true,
      },
      employee_reviews: {
        active: false,
      },
      awards: {
        active: false,
        total: 0,
      },
      socials: {
        active: true,
        total: 4,
      },
      news: {
        active: false,
      },
      people: {
        active: true,
        total: 9,
      },
      jobs: {
        active: true,
        total: 4,
      },
      finance: {
        active: true,
      },
      contracts: {
        active: false,
        total: 0,
      },
      salaries: {
        active: false,
        total: 0,
      },
      locations: {
        active: true,
        total: 2,
      },
      trademarks: {
        active: false,
        total: 0,
      },
    },
  },
};

const generateDescription = (overview: IOverview) => {
  const items: DescriptionsProps["items"] = [
    {
      label: "Logo",
      children: (
        <img
          width={272}
          alt="logo"
          src={overview.overview.logo.med}
          style={{
            borderRadius: "15px",
          }}
        />
      ),
      span: 3,
    },
    {
      label: "Name",
      children: item.overview.name,
      span: 3,
    },
    {
      label: "Legal Name",
      children: overview.overview.legal_name,
      span: 3,
    },
    {
      label: "Description",
      children: overview.overview.description,
      span: 3,
    },
    {
      label: "Staff",
      children: (
        <Space>
          <span>Min: {overview.overview.staff.min}</span>
          <br />
          <span>Med: {overview.overview.staff.med}</span>
          <br />
          <span>Max: {overview.overview.staff.max}</span>
        </Space>
      ),
      span: 3,
    },
    {
      label: "location",
      children: (
        <Space>
          <span>{overview.overview.location.street}</span>
          <br />
          <span>{overview.overview.location.suburb}</span>
          <br />
          <span>{overview.overview.location.postcode}</span>
          <br />
          <span>{overview.overview.location.state}</span>
          <br />
          <span>{overview.overview.location.country}</span>
          <br />
          <span>{overview.overview.location.countrycode}</span>
          <br />
          <span>{overview.overview.location.lga}</span>
          <br />
          <span>{overview.overview.location.latitude}</span>
          <br />
          <span>{overview.overview.location.longitude}</span>
        </Space>
      ),
      span: 3,
    },
    {
      label: "Contact",
      children: (
        <Space>
          <span>{overview.overview.contact.website}</span>
          <br />
          <span>{overview.overview.contact.email}</span>
          <br />
          <span>{overview.overview.contact.phone}</span>
        </Space>
      ),
      span: 3,
    },
    {
      label: "Tags",
      children: (
        <Space>
          {overview.overview.tags.map((tag: string) => (
            <Tag key={tag} color="lime">
              {tag}
            </Tag>
          ))}
        </Space>
      ),
      span: 3,
    },
    {
      label: "Sector",
      children: overview.overview.sector,
    },
    {
      label: "Type",
      children: overview.overview.type,
    },
    {
      label: "Status",
      children: <Badge status={overview.overview.status === "active" ? "success" : "error"} color={overview.overview.status === "active" ? "green" : "blue"} text={overview.overview.status} />,
    },
    {
      label: "Country",
      children: overview.overview.countrycode,
    },
    {
      label: "ABN",
      children: overview.overview.abn,
    },
    {
      label: "ACN",
      children: overview.overview.acn,
    },
    {
      label: "Industry",
      children: overview.overview.industry,
    },
  ];

  return items;
};

const CompanyDetail = () => {
  const loadRef = React.useRef<boolean>(false);
  const { id } = useParams();
  
  const [detail, setDetail] = React.useState<any>(null);
  const [overview, setOverview] = React.useState<IOverview | null>(null);
  const [aiRecommendation, setAiRecommendation] = React.useState<any>(null);

  React.useEffect(() => {
    if (loadRef.current === false && id) {
      http
        .post(`${APP_DOMAIN}/api/company/query/detail`, {
          knowfirst_id: id,
        })
        .then((res) => {
          // @ts-ignore
          setOverview(res.overview);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  return (
    <>
      {overview ? (
        <>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Company</Breadcrumb.Item>
            <Breadcrumb.Item>{overview.overview.legal_name}</Breadcrumb.Item>
          </Breadcrumb>
          <Descriptions title="Company overview" column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }} items={generateDescription(overview)} />
        </>
      ) : (
        <div>loading</div>
      )
    }
    </>
  );
};

export default CompanyDetail;
